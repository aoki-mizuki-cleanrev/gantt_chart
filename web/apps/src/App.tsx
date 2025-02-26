import Header from "./Header";
import Controller from "./Controller";
import Chart from "./Chart";

function App() {
    // const [count, setCount] = useState(0);
    // const [jsonData, setJsonData] = useState<Array<{ id: number; message: string }> | undefined>();
    return (
        <div>
            <Header />
            <Controller />
            <Chart />
        </div>
    );
}

export default App;
