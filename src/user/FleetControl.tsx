import { useState } from 'react'

type rego = {
  index: number,
  license: string,
  notify: boolean,
  obsolete: boolean,
}
let fleets = [{index: 1, license: "ABC123", notify: false, obsolete: false},
{index: 2, license: "XYZ000", notify: true, obsolete: true},
{index: 3, license: "TMP934", notify: true, obsolete: false},
{index: 4, license: "CCW300", notify: false, obsolete: false},
{index: 5, license: "ZZZ111", notify: false, obsolete: false},
];

export default function FleetControl() {
  const [items, setItems] = useState(fleets)
  const addItemHandler = (license: string) => {
    fleets.unshift({
      index: 6,
      license: license,
      notify: false,
      obsolete: false,
    });
    setItems(fleets);
  }
  return (
    <div className="items-center justify-center h-auto p-5">
      <div className="container">
        <div className="flex justify-center">
          <div className="bg-gray-100 shadow-2xl w-1/2">
            <ListGroup items={items}/>
            <div className="w-full max-w-xs">
              <AddNew itemHandler={addItemHandler}/>
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}

const ListGroup = (prop: {items: rego[]}) => {
  let fleets = prop.items.map((item) => <List key={item.index} item={item}/>);
  return (
    <ul className="divide-y divide-gray-300">
      <li className="p-4 bg-gray-300">
        <p className="font-bold text-right">Enable Notification</p>
      </li>
      {fleets}
    </ul>
  );
};

const List = (prop: {key: number, item: rego}) => {
  const [obsolete, setObsolete] = useState(prop.item.obsolete);
  const [notify, setNotify] = useState(prop.item.notify);
  return (
    <li className="p-4 hover:bg-gray-200 cursor-pointer">
      <div className="flex">
        <div className={`flex-auto ${obsolete ? "line-through text-red-400": ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" onClick= {() => setObsolete(!obsolete)} className="h-6 w-6 float-left mr-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <p>{prop.item.license}</p>
        </div>
        <div className="flex-auto">
          <button onClick = {() => setNotify(!notify)} className={`float-right transition ease-in-out duration-300 w-12  rounded-full focus:outline-none bg-gray-200 ${notify ? "bg-green-300" : ""}`}>
          <div className={`"transition ease-in-out duration-300 rounded-full h-6 w-6 bg-white shadow ${notify ? "transform translate-x-full" : ""}`}></div>
          </button>
        </div>
      </div>
    </li>    
  );
};

const AddNew = (prop: {itemHandler: (arg: string) => void}) => {
  const [license, setLicense] = useState("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLicense(e.currentTarget.value);
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    prop.itemHandler(license);
    setLicense("");
  }
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex items-center border-b py-5">
        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" onChange={handleChange} type="text" placeholder="add a new license..." aria-label="New license"/>
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
          Ok
        </button>
        <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="reset">
          Cancel
        </button>
      </div>
    </form>    
  )
}