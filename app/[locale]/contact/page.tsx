export default function ContactPage(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-2">Contact us</h1>
      <form className="card space-y-3 max-w-xl">
        <input className="input" placeholder="Email" />
        <textarea className="input h-32" placeholder="Message" />
        <button className="btn-primary">Send</button>
      </form>
    </div>
  );
}
