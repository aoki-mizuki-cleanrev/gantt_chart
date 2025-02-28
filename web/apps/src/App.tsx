import Header from "./components/Header";
import Controller from "./components/Controller";
import Chart from "./components/Chart";

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
