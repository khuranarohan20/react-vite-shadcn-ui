import { ContextMenuDemo } from "./components/ContextMenuDemo";
import { DataTable } from "./components/DataTable";
import { DrawerDemo } from "./components/DrawerDemo";
import Modal from "./components/Modal";
import { Button } from "./components/ui/button";
import VirtualizedTable from "./components/VirtualizedTable";

function App() {
  return (
    <>
      <div className="h-[100%] w-[100%] p-4 overflow-auto flex justify-center items-center gap-2">
        <Button>This is a button</Button>
        <Modal />
        <ContextMenuDemo />
        <DrawerDemo />
      </div>
      <DataTable />
      <div className="container mx-auto py-10">
        <VirtualizedTable />
      </div>
    </>
  );
}

export default App;
