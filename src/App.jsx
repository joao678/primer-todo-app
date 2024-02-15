import { DashIcon, PlusIcon } from '@primer/octicons-react';
import { Box, Button, Checkbox, IconButton, PageLayout, Text, TextInput } from '@primer/react';
import { DataTable, PageHeader } from '@primer/react/drafts';
import { useState } from 'react';
import './App.css';

function App() {
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState('');

    return (
        <Box m={4} display={'grid'} gridAutoFlow={'row'} gridGap={2} sx={{ overflowWrap: 'anywhere' }}>
            <Box display={'grid'} gridAutoFlow={'column'} gridAutoColumns={'1fr 0fr'} gridGap={2}>
                <TextInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Button variant='primary' trailingVisual={() => <PlusIcon />} onClick={() => {
                    setTodoList([...todoList, { done: false, text: inputValue, id: todoList.length + 1 }]);
                    setInputValue('');
                }}>Add</Button>
            </Box>
            <Box display={todoList.length ? 'block' : 'none'}>
                <DataTable
                    data={todoList}
                    columns={[{
                        header: 'Done',
                        field: 'done',
                        maxWidth: 70,
                        align: 'start',
                        renderCell: (row) => <Checkbox checked={row.done}
                            onChange={() => {
                                const id = todoList.findIndex(x => x === row);
                                todoList[id].done = !todoList[id].done;
                                setTodoList([...todoList])
                            }}
                        />
                    }, {
                        header: 'Description',
                        field: 'text',
                        width: 'grow',
                        maxWidth: '100%',
                        renderCell: (row) => <Text sx={{
                            // color: row.done ? 'success.fg' : '',
                            fontWeight: 'bold',
                            textDecoration: row.done ? 'line-through' : ''
                        }}>{row.text}</Text>
                    }, {
                        header: '',
                        field: '',
                        align: 'end',
                        renderCell: (row) => <IconButton variant='danger' trailingVisual={() => <DashIcon />} onClick={() => {
                            todoList.splice(todoList.findIndex(x => x === row), 1);
                            setTodoList([...todoList]);
                        }}></IconButton>
                    }]}></DataTable >
            </Box>
        </Box >
    )
}

export default App
