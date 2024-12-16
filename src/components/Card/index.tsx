
interface CardProps {
  title: string;
  text: React.ReactNode|string|number
  Icon:React.ReactNode
}
function Card({title,text,Icon}:CardProps){
  return (
    <div className="rounded-xl border-[#e4e4e4] border bg-white text-card-foreground w-full p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="tracking-tight text-sm font-medium">
                {title}
            </div>
            <div className="flex-shrink-0">
                {Icon} 
            </div>
        </div>
      <div className="text-2xl font-bold text-gray-900">{text}</div>
    </div>
  );
};

export default Card;
