import React, {Component} from 'react';
import './css/App.css';
import NameForm from "./components/NameForm";

class App extends Component {
    render() {
        return (
            <div className="App">
                <NameForm/>
            </div>
        );
    }
}

export default App;

// import React from 'react';
// import FlavorForm from "./FlavorForm";
// import NameForm from "./NameForm";
// import MyTable from "./MyTable";
//
// const selectList = {
//     selectedOption: 'dev',
//     options: ['test', 'prod', 'dev']
// }
// const tableExample = {
//     tableName: 'DICT_ASPR',
//     columnNames: ['aspr_id', 'id', 'lpt_code'],
//     rows: [['as01', 'i02aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'l03'], ['as11', 'i12', 'l13'], ['as21', 'i22', 'l23'], ['as31', 'i32', 'l33']]
// }
//
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             table:tableExample,
//         };
//     }
//
//     render() {
//         return (
//             <form>
//                 <FlavorForm selectList={selectList}/>
//                 <NameForm/>
//                 <MyTable
//                     table={this.state.table}
//                 />
//             </form>);
//     }
// }
//
// export default App;