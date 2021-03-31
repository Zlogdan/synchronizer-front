const tableExampleMui = {
    columns: [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'LOAN_PRODUCT_TYPE', width: 300},
        {field: 'LPT_CODE', headerName: 'Last name', width: 300},
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        },
    ],
    rows: [
        {id: 1, LOAN_PRODUCT_TYPE: 'Snoqweqweqrwrqwrfdsmfdns,fms,fmenw', firstName: 'Jon', age: 35},
        {id: 2, LOAN_PRODUCT_TYPE: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, LOAN_PRODUCT_TYPE: 'Lannister', firstName: 'Jaime', age: 45},
        {id: 4, LOAN_PRODUCT_TYPE: 'Stark', firstName: 'Arya', age: 16},
        {id: 5, LOAN_PRODUCT_TYPE: 'Targaryen', firstName: 'Daenerys', age: null},
        {id: 6, LOAN_PRODUCT_TYPE: 'Melisandre', firstName: null, age: 150},
        {id: 7, LOAN_PRODUCT_TYPE: 'Clifford', firstName: 'Ferrara', age: 44},
        {id: 8, LOAN_PRODUCT_TYPE: 'Frances', firstName: 'Rossini', age: 36},
        {id: 9, LOAN_PRODUCT_TYPE: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 10, LOAN_PRODUCT_TYPE: 'Frances', firstName: 'Rossini', age: 36},
        {id: 11, LOAN_PRODUCT_TYPE: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 12, LOAN_PRODUCT_TYPE: 'Frances', firstName: 'Rossini', age: 36},
        {id: 13, LOAN_PRODUCT_TYPE: 'Roxie', firstName: 'Harvey', age: 65},
    ]
}
export default tableExampleMui;