import TableQuery from "../components/TableQuery";
import serverList from "../static/Servers";


const Dict = () => (
    <div>
        <TableQuery serverList={serverList}/>
    </div>
)
export default Dict
