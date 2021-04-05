const tableExample = {
    ASPR_BASE_RESULT: {
        columns: [
            {field: 'id', headerName: 'ID', width: 70},
            {field: 'lpt', headerName: 'LPT', width: 300},
            {field: 'aspr', headerName: 'ASPR', width: 300},
            {field: 'creator', headerName: 'CREATOR', width: 300},
        ],
        rows: [
            {id: 1, lpt: 'lpt text', aspr: 'Jon', creator: 35},
            {id: 2, lpt: 'lpt text', aspr: 'Cersei', creator: 35},
        ]
    },
    ASPR_WSCALL_LOG: {
        columns: [
            {field: 'id', headerName: 'ID', width: 70},
            {field: 'lpt', headerName: 'LPT', width: 300},
            {field: 'aspr', headerName: 'ASPR', width: 300},
            {field: 'creator', headerName: 'CREATOR', width: 300},
        ],
        rows: [
            {id: 1, lpt: 'lpt text', aspr: 'Jon', creator: 35},
            {id: 2, lpt: 'lpt text', aspr: 'Cersei', creator: 35},
        ]
    }
}
export default tableExample;