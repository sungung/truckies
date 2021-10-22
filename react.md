# React Notes

## references
* Typescript cheatsheets <https://github.com/typescript-cheatsheets/react>
* Ignite - react native boilerplat <https://github.com/typescript-cheatsheets/react>

## Using style
* create css file
```
html, body, #root, .room {
  height: 100%;
  margin: 0;
}
.lit {
  background-color: white;
  color: black;
}
.dark {
  background-color: black;
  color: white;
}
```
* import css file in js
```
import "./index.css";
```
* using css class
```
import "./index.css";

const room = () => {
  const [lit, setLit] = useState(true);

  return (
  <div className={`room ${lit ? 'lit' : 'dark'}`}>
    the room is {lit ? 'lit' :'dark'}
    <br/>
    <button onClick={() => setLit(!lit)}>
      flip
    </button>
  </div>)
}
```

## State in function component

### Props are passed down the component tree, and it is object. In that reason, when object is destructing, '(props)' becomes '({ value })'
```
function App() {
  const greeting = 'Hello world!!';
  return <Headline value={greeting}/>
}

function Headline(props) {
  return <h1>{props.value}</h1>
}
```
* Same in arrow function
```
const App = () => {
  const greeting = 'Hello world!!';
  return <Headline value={greeting}/>
}

// or
// const Headline = (props) => { return <h1>{props.value}</h1> }
const Headline = ({ value }) => {
  return <h1>{value}</h1>
}
```
### useState hook takes an initial state as parameter and returns an array which holds the current state a first item and a function to change the state as second item.
```
const room = () => {
  const [lit, setLit] = useState(false);
  return (
  <div className="room">
    the room is {lit ? 'lit' :'dark'}
    <br/>
    <button onClick={setLit(!lit)}>
      flip
    </button>
  </div>)
}
```
```
const App = () => {
  return <Headline />
}

const Headline = () => {
  const[greeting, setGreeting] = useState('Hello world!');
  const handleChange =  e => setGreeting(e.target.value);
  return (
    <div>
      <h1>{greeting}</h1>
      <input type="text" onChange={handleChange} />
     </div>
  );
};
```
* Pass a callback to a child component
```
const App = () => {
  const [greeting, setGreeting] = useState('Hello world!!');
  const handleChange =  e => setGreeting(e.target.value);
  return <Headline headline={greeting} onChangeHeadline={handleChange}/>
}

const Headline = ({ headline, onChangeHeadline}) => {
  return (
    <div>
      <h1>{headline}</h1>
      <input type="text" onChange={onChangeHeadline} />
     </div>
  );
};
```

## Determine rendering

### React memo can be used for react function components to prevent a renderer when the incoming props of this component haven't changed.

```
const App = () => {
  const [greeting, setGreeting] = useState('Hello React!');
  const [count, setCount] = useState(0);
 
  const handleIncrement = () =>
    setCount(currentCount => currentCount + 1);
 
  const handleDecrement = () =>
    setCount(currentCount => currentCount - 1);
 
  const handleChange = event => setGreeting(event.target.value);
 
  return (
    <div>
      <input type="text" onChange={handleChange} />
 
      <Count count={count} />
 
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
      <button type="button" onClick={handleDecrement}>
        Decrement
      </button>
    </div>
  );
};

// Updating textbox won't trigger rendering. 
// It will be rendered only count value is changed.
const Count = memo(({ count }) => {
  console.log('Does it (re)render?');
  return <h1>{count}</h1>;
});
```

## Fetching REST
```
const reddit = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://www.reddit.com/r/reactjs.json`).then((res) => {
      const newPosts = res.data.data.children.map((obj) => obj.data);
      setPosts(newPosts);
    });
  }, []);

  return (
    <div>
      <h1>/r/reactjs</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};
```

## Firestore

### Create document 'groceryLists'
export const createGroceryList = (userName) => {
    return db.collection('groceryLists')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            users: [{ name: userName}]
        });
};
### Fetch data as a side effect, useEffect fires after component is rendered
useEffect(() => {
    if (groceryListId) {
      FirestoreService.getGroceryList(groceryListId)
        .then(groceryList => {
          if (groceryList.exists) {
            setError(null);
            setGroceryList(groceryList.data());
          } else {
            setError('grocery-list-not-found');
            setGroceryListId();
          }
        })
        .catch(() => setError('grocery-list-get-fail'));
    }s
  }, [groceryListId, setGroceryListId]);
### Streaming data then unsubscribe stream when component is unmounted
useEffect(() => {
    const unsubscribe = FirestoreService.streamGroceryListItems(groceryListId, {
        // The observer object contains a next function that is called by 
        // the Firebase web API every time the items sub-collection changes.
        next: querySnapshot => {
            const updatedGroceryItems = 
                querySnapshot.docs.map(docSnapshot => docSnapshot.data());
            setGroceryItems(updatedGroceryItems);
        },
        error: () => setError('grocery-list-item-get-fail')
    });
    return unsubscribe;
}, [groceryListId, setGroceryItems]);