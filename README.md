
# Dormitory Management System

This web based application provides an easy to use intreface for the university dormitory administrators and makes their job easier
by allowing them to organize and provide them with an overview of the building they manage. It was developed using the following thechnologies.


## Documentation
I used the following technologies for the implementation of this project. They all come together to bring you the finished result that you see in your browser.
* [ReactJS](https://react.dev/) as the frontend framework
* [MaterialUI](https://mui.com/material-ui/getting-started/overview/) as the user interface components library
* [ExpressJS](https://expressjs.com/en/starter/installing.html) as the backend framework
* [MySQL Workbench](https://dev.mysql.com/doc/workbench/en/) as the database


## Installation and Run locally

After cloning the repository on your local machine, you need to follow the next steps in order to run the application succesfully.

1. Setting up the database on your machine by using the file stored inside the Dump20230323 folder.

2. Open the project using your favourite IDE. I strongly reccomend using VS Code.

3. In the first terminal make sure you are in the "Dormitory-Management-System" folder. You need to switch to the server folder by entering the first command and then after that has been executed, enter the second command in order to run the server.
```bash
  cd server
  npm start
```
4. In the second terminal make sure you are in the "Dormitory-Management-System" folder. You need to switch to the client folder by entering the first command and then after that has been executed, enter the second command in order to run the client. This will open up a tab in your browser containing the webb application.
```bash
  cd client
  npm start
```

5. All the dependencies are specified in the package.json files for both the client and the served side.
## Usage/Examples
This piece of code is where the application starts by fetching the data from the database and displaying it in the browser.

```javascript
function App() {
  const [listOfDorms, setListOfDorms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/dorms").then((response) => {
      setListOfDorms(response.data);
    })
  }, []);

  return (
    <MyComponent>
      {listOfDorms.map((value) => {
        return (
            <div className='dorm' key={value.adress}>
                <div className='name'> {value.name} </div>
                <div className='admin'> {value.administrator} </div>
                <div className='adress'> {value.adress} </div>
            </div>
        );
     })} 
    </MyComponent>
  );
}
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

