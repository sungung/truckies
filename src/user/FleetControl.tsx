import { useReducer, useState, useEffect } from 'react'
import { fleetDBControl, fleetDBQuery } from '../common/fstoreManager'
import useUser from '../common/UserContext'

type Rego = {
  license: string,
  notify: boolean,
  obsolete: boolean,
}

type ListMode = 'idle' | 'loading' | 'no-results' | 'error';

type ListState = {
  mode?: ListMode;
  regos: Array<Rego>;
}

type ActionType = 
 | { type: 'SET-MODE', payload: {mode: ListMode} }
 | { type: 'ADD_NEW_ITEM', payload: {user: firebase.default.User, rego: Rego} }
 | { type: 'REMOVE_ITEMS', payload: {user: firebase.default.User} }
 | { type: 'TOGGLE_NOTIFY', payload: {user: firebase.default.User, license: string} }
 | { type: 'TOGGLE_OBSOLETE', payload: {license: string} }
 | { type: 'RESET', payload: {regos: Rego[]} };

 const initialState: ListState = {
  mode: 'idle',
  regos: []
} 

// Type return data type with parameters type
const reducer = (state: ListState, action: ActionType): ListState => {

  switch (action.type){
    case 'ADD_NEW_ITEM': {
      fleetDBControl(action.payload.user, action.payload.rego.license, action.payload.rego.notify).catch(e => {
        console.log('In reducer: ' + e);
        return {mode: 'error'}
      });
      return {mode: 'idle', regos: [action.payload.rego, ...state.regos]};
    }
    case 'TOGGLE_NOTIFY': {
      return {mode: 'idle', regos: state.regos.map((item) => {
        if (item.license === action.payload.license) {
          const updated = {...item, notify: !item.notify};
          fleetDBControl(action.payload.user, item.license, !item.notify, 'update');
          return updated;
        }
        return item;
      })};
    }
    case 'TOGGLE_OBSOLETE': {
      return {mode: 'idle', regos: state.regos.map((item) => {
        if (item.license === action.payload.license) {
          const updated = {...item, obsolete: !item.obsolete};
          return updated;
        }
        return item;
      })};
    }
    case 'REMOVE_ITEMS': {
      return {mode: 'idle', regos: state.regos.filter((item) => {
        if (item.obsolete) {
          fleetDBControl(action.payload.user, item.license, item.notify, 'delete')
        }
        return !item.obsolete
      })};
    }
    case 'RESET': {
      return {mode: 'idle', regos: action.payload.regos};
    }
    case 'SET-MODE': {
      return {mode: action.payload.mode, regos: []};
    }
    default:
      throw new Error();
  }
}

/**
 * Fetch data when component is loaded, then individual update transaction
 * will trigger a change in firestore but not refresh from firebase.
 * TODO 
 * handling exception in individual transaction. and sametime
 * developing firebase update and showing result in UI pattern.
 * @returns 
 */
export default function FleetControl() {

  const [list, dispatch] = useReducer(reducer, initialState);
  const [license, setLicense] = useState("");
  const { auth } = useUser();

  // TODO
  // trigger side effect when button event fired?? e.g. after clicking delete button
  useEffect(() => {
    const fetchFleet = async () => {
      try {
        dispatch({ type: 'SET-MODE', payload: {mode: 'loading'} });
        let response = await fleetDBQuery(auth.currentUser);
        let regos: Rego[] = response.map((f) => {return f as Rego});
        dispatch({ type: 'RESET', payload: {regos: [...regos]} })
      } catch (e) {
        console.log('Error while fetch user fleet', e);
        dispatch({ type: 'SET-MODE', payload: {mode: 'error'} });
      }
    };
    fetchFleet();
  }, [auth.currentUser])

  const handleAddChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLicense(e.currentTarget.value);
  }
  
  const handleAdd = () => {
    // filter duplication
    if (!license || list.regos.find(el => el.license === license)) {
      // TODO design common alert component
      alert("try again");
    } else {
      dispatch({type: 'ADD_NEW_ITEM', payload: {user: auth.currentUser,rego: {license, notify: false, obsolete: false}} });
    }
    setLicense("");
  };

  const handleToggleNotify = (license: string) => {
    dispatch({type: 'TOGGLE_NOTIFY', payload: {user: auth.currentUser, license: license}});
  };

  const handleToggleObsolete = (license: string) => {
    dispatch({type: 'TOGGLE_OBSOLETE', payload: {license: license}})
  };

  const handleRemoveItems = () => {
    dispatch({type: 'REMOVE_ITEMS', payload: {user: auth.currentUser}})
  }

  return (
    <div className="items-center justify-center h-auto p-5">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-1/2">
            <AddNewItem license={license} onAdd={handleAdd} onChange={handleAddChange}/>
            <div className="bg-gray-100 shadow-2xl">
              { list.mode === 'loading' && <p>Loading data...</p> }
              { list.mode === 'error' && <p>Cannot fetch data at the moment, please try again</p> }
              { list.mode === 'idle' && 
                <List items={list.regos} onToggleNotify={handleToggleNotify} onToggleObsolete={handleToggleObsolete} onRemove={handleRemoveItems}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
};

const AddNewItem = (prop: {license: string, onAdd: ()=>void, onChange: (e: React.FormEvent<HTMLInputElement>)=>void}) => {
  return (
    <div className="my-3 flex justify-end">
      <input className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-500 border-yellow-700 bg-white" onChange={prop.onChange} value={prop.license} type="text" placeholder="add a new license..." aria-label="New license"/>
      <button className="px-8 rounded-r-lg bg-yellow-600 text-gray-800 font-bold p-4 uppercase border-yellow-700 hover:bg-yellow-700 border-t border-b border-r" type="button" onClick={prop.onAdd}>
        Ok
      </button>
    </div>    
  )
};

const List = ( props: { items: Rego[], onToggleNotify: (arg: string)=>any, onToggleObsolete: (arg: string)=>any , onRemove: ()=>void} ) => {
  // find removed item and build fleet list
  let fleet: JSX.Element[] = [];

  props.items.forEach((item: Rego) => {
    fleet.push(<ListItem key={item.license} item={item} onToggleNotify={props.onToggleNotify} onToggleObsolete={props.onToggleObsolete}/>);
  });

  return (
    <ul className="divide-y divide-gray-300">
      <li className="p-4 bg-gray-300">
        <div className="flex items-center">
          <button className="disabled:opacity-50 flex-initial px-6 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-gray-800 p-2 font-bold border-yellow-700 uppercase" onClick={props.onRemove}>Delete</button>
          <p className="flex-auto font-bold text-right">Enable Notification</p>
        </div>
      </li>
      {fleet}
    </ul>
  );
};

const ListItem = (props: {key: string, item: Rego, onToggleNotify: (arg: string)=>any, onToggleObsolete: (arg: string)=>any }) => {

  return (
    <li className="p-4 hover:bg-gray-200 cursor-pointer">
      <div className="flex">
        <div className={`flex-auto ${props.item.obsolete ? "line-through text-red-400": ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" onClick= {() => props.onToggleObsolete(props.item.license)} className="h-6 w-6 float-left mr-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <p>{props.item.license}</p>
        </div>
        <div className="flex-auto">
          <button onClick = {() => props.onToggleNotify(props.item.license)} className={`float-right transition ease-in-out duration-300 w-12 rounded-full focus:outline-none bg-gray-200 ${props.item.notify ? "bg-green-300" : ""}`}>
          <div className={`"transition ease-in-out duration-300 rounded-full h-6 w-6 bg-white shadow ${props.item.notify ? "transform translate-x-full" : ""}`}></div>
          </button>
        </div>
      </div>
    </li>    
  );
};