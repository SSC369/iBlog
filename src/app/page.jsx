import CardList from "@/components/cardList/CardList";

export default function Home(props) {
  const { searchParams } = props;
  const page = parseInt(searchParams.page) || 1;

  return <CardList page={page} />;
}
