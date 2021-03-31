import TableQuery from "../components/TableQuery";

const selectList = {
    selectedOption: '',
    options: ['MSBTEST', 'MSBDEV']
}

const Dict = () => (
    <div>
        <TableQuery selectList={selectList}/>
    </div>
)
export default Dict
