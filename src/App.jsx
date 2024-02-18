import { DashIcon, PlusIcon } from '@primer/octicons-react';
import { Box, Button, Checkbox, IconButton, Text, TextInput } from '@primer/react';
import { DataTable } from '@primer/react/drafts';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const tableBody = document.querySelector('.TableBody');

        tableBody.scrollHeight > tableBody.clientHeight ?
            tableBody.style.scrollbarGutter = 'stable' :
            tableBody.style.scrollbarGutter = '';
    }, [todoList]);

    return (
        <Box
            p={4}
            display={'grid'}
            gridAutoFlow={'row'}
            gridGap={2}
            gridTemplateRows={'0fr 1fr'}
            sx={{ height: '100vh' }}>
            <Box display={'grid'} gridAutoFlow={'column'} gridAutoColumns={'1fr 0fr'} gridGap={2}>
                <TextInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Button variant='primary' trailingVisual={() => <PlusIcon />} onClick={() => {
                    setTodoList([...todoList, { done: false, text: inputValue, id: todoList.length + 1 }]);
                    setInputValue('');
                }}>Add</Button>
            </Box>
            <DataTable
                data={todoList}
                columns={[{
                    header: 'Done',
                    field: 'done',
                    align: 'start',
                    width: 'auto',
                    renderCell: (row) => <Checkbox checked={row.done}
                        onChange={() => {
                            const id = todoList.findIndex(x => x === row);
                            todoList[id].done = !todoList[id].done;
                            setTodoList([...todoList]);
                        }}
                    />
                }, {
                    header: 'Description',
                    field: 'text',
                    width: 'growCollapse',
                    renderCell: (row) => <Text sx={{
                        color: row.done ? 'accent.fg' : '',
                        fontWeight: 'bold',
                        textDecoration: row.done ? 'line-through' : ''
                    }}>{row.text}</Text>
                }, {
                    header: '',
                    field: '',
                    align: 'end',
                    width: 'auto',
                    renderCell: (row) => <IconButton variant='danger' trailingVisual={() => <DashIcon />} onClick={() => {
                        todoList.splice(todoList.findIndex(x => x === row), 1);
                        setTodoList(todoList.map((x, i) => ({ done: x.done, text: x.text, id: i })));
                    }} />
                }]} />
        </Box>
    )
}

export default App
