import ClientSuspense from './ClientSuspense';
import { lazy } from 'react';

const Todo = lazy(() => import('todo/Todo'));
const Calculator = lazy(() => import('calculator/Calculator'));

function App() {
  return (
    <div>
      <h1>Host</h1>
      <div>
        <h2>Todo App</h2>
        <ClientSuspense fallback={<div>loading</div>}>
          <Todo />
        </ClientSuspense>
      </div>
      <div>
        <h2>Calculator App</h2>
        <ClientSuspense fallback={<div>loading</div>}>
          <Calculator />
        </ClientSuspense>
      </div>
    </div>
  );
}

export default App;
