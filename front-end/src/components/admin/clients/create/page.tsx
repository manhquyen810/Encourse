import CreateForm from "./CreateForm";

export default function CreateClientPage() {
  return (
    <div className="max-w-full p-10 ">
      <div className="max-w-xl p-6 mx-auto rounded-xl bg-white shadow-xl">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Create Client
        </h1>
        <CreateForm />
      </div>
    </div>
  );
}
