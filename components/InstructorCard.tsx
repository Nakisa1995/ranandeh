type Props = { name: string; city: string; phone?: string; bio?: string };
export default function InstructorCard({name, city, phone, bio}: Props){
  return (
    <div className="border rounded p-4">
      <div className="font-semibold text-lg">{name}</div>
      <div className="text-sm text-gray-500">{city}</div>
      {bio && <p className="mt-2 text-sm">{bio}</p>}
      {phone && <div className="mt-2 text-sm">☎ {phone}</div>}
    </div>
  );
}
