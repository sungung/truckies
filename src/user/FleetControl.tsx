import { useState, useEffect } from 'react'
import useUser from '../common/UserContext'
import * as service from './fleetControlService'

const FleetControl = () => {

  const [license, setLicense] = useState("");
  const [regos, setRegos] = useState([] as service.Rego[]);
  const { auth } = useUser();

  useEffect(() => {
    const unsubsribe = service.query(auth.currentUser.uid).onSnapshot((snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        obsolete: false,
      }))
      setRegos(items as service.Rego[]);
    }, (error) => {
      setRegos([]);
      console.error('Failed to fetch user fleet. ' + error)
    });
    return () => unsubsribe();
  }, [auth.currentUser])

  const handleAddChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLicense(e.currentTarget.value);
  }
  
  /**
   * TODO
   * handling exception,
   * implement common alert, proceed only get ok, but user will have cancel 
   */
  const handleAdd = () => {
    // filter duplication
    if (!license) {
      // TODO design common alert component
      alert("try again");
    } else {
      const entity = {uid: auth.currentUser.uid, license: license, notify: false};
      service.create(entity)
      .then(() => {
        console.log('loading')
      })
      .catch((error) => {
        console.log('no good')
      })
      .finally(() => {
        console.log('done')
      })
    }
    setLicense("");
  };

  const handleToggleNotify = (rego: service.Rego) => {
    rego.notify = !rego.notify;
    service.update(rego)
      .then(() => {
        console.log('loading')
      })
      .catch((error) => {
        console.log('no good')
      })
      .finally(() => {
        console.log('done')
      })
  };

  const handleToggleObsolete = (rego: service.Rego) => {
    alert('are you sure?');
    service.remove(rego)
    .then(() => {
      console.log('loading')
    })
    .catch((error) => {
      console.log('no good')
    })
    .finally(() => {
      console.log('done')
    })    
  };

  let fleet: JSX.Element[] = regos.map((item: service.Rego) => {
    // id cannot be undefined when it is added into the list, so use exclamation mark item.id!
    return <ListItem key={item.id!} item={item} onToggleNotify={handleToggleNotify} onToggleObsolete={handleToggleObsolete}/>
  });

  return (

    <div className="items-center justify-center h-auto p-5">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-1/2">
            <AddNewItem license={license} onAdd={handleAdd} onChange={handleAddChange}/>
            <div className="bg-gray-100 shadow-2xl">
              <ul className="divide-y divide-gray-300">
                <li className="p-4 bg-gray-300">
                  <div className="flex items-center">
                    <p className="flex-auto font-bold text-right">Enable Notification</p>
                  </div>
                </li>
                {fleet}
              </ul>            
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
};

const ListItem = (props: {key: string, item: service.Rego, onToggleNotify: (arg: service.Rego)=>any, onToggleObsolete: (arg: service.Rego)=>any }) => {

  return (
    <li className="p-4 hover:bg-gray-200 cursor-pointer">
      <div className="flex">
        <div className={`flex-auto ${props.item.obsolete ? "line-through text-red-400": ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" onClick= {() => props.onToggleObsolete(props.item)} className="h-6 w-6 float-left mr-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <p>{props.item.license}</p>
        </div>
        <div className="flex-auto">
          <button onClick = {() => props.onToggleNotify(props.item)} className={`float-right transition ease-in-out duration-300 w-12 rounded-full focus:outline-none bg-gray-200 ${props.item.notify ? "bg-green-300" : ""}`}>
            <div className={`"transition ease-in-out duration-300 rounded-full h-6 w-6 bg-white shadow ${props.item.notify ? "transform translate-x-full" : ""}`}></div>
          </button>
        </div>
      </div>
    </li>    
  );
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

export default FleetControl;