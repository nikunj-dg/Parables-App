import { useNavigate } from "react-router-dom";

interface Parable {
    id: number;
    title: string;
    content: string;
    author?: string;
    tags?: string;
}

type ParableCardProps = {
  parable: Parable;
};

const ParableCard = ({ parable }: ParableCardProps) => {
  const navigate = useNavigate();

  const handleParableClick = (e: React.MouseEvent, parable: Parable) => {
    e.stopPropagation();
    navigate(`/parable/${parable.id}`,
      { state: {parable} }
    );
  };

  return (
    <div onClick={(e) => handleParableClick(e, parable)} className="border-1 border-black-300 bg-white rounded-lg p-4 m-4 shadow-md hover:shadow-xl transition duration-200 h-40 w-80">
      <h2 className="text-lg font-semibold mb-2">{parable.title}</h2>
      <h3 className="font-medium mb-1">{parable.author}</h3>
      <p>{parable.content.slice(0, 90)}...</p>
    </div>
  );
};

export default ParableCard;
