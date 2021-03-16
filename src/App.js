import React, {Component} from 'react';
import './css/App.css';
import Table from './components/Table'
import tableExample from "./components/TableExample";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            <p className="Table-header">{tableExample.tableName}</p>
                            <Table tableExample={tableExample}/>
                        </div>
                        <div className="col-sm">
                            тут будет другая часть
                        </div>
                    </div>
                </div>
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