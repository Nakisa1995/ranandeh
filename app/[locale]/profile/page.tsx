export default function ProfilePage(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Your profile</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="card space-y-3">
          <h2 className="font-semibold">Account</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="input" placeholder="Name"/>
            <input className="input" placeholder="Email"/>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="input" placeholder="City"/>
            <input className="input" placeholder="Phone"/>
          </div>
          <button className="btn-primary">Save</button>
        </section>
        <section className="card space-y-3">
          <h2 className="font-semibold">Preferences</h2>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Switch language & theme from the header.
          </div>
        </section>
      </div>
    </div>
  );
}
