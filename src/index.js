import DOM from './dom'

const $app = document.getElementById('app')

const columns = ['id', 'name', 'age']
const rows = [{
    id: 1,
    name: 'Joe Doe',
    age: 20
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 22
  },
  {
    id: 3,
    name: 'Dave Doe',
    age: 23
  }
]

const createColumns = columns => columns.map(column => DOM.th()([{}, column]))
const createRows = rows => rows.map(row =>
  DOM.tr()([{},
    Object.keys(row).map(column => DOM.td()([{}, row[column]]))
  ])
)

$app.append(
  DOM.table()([{ class: 'this-is-how-you-add-dom-attributes' },
    [
      DOM.thead()([{}, createColumns(columns)]),
      DOM.tbody()([{}, createRows(rows)])
    ]
  ]))
