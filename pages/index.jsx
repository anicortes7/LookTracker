import Navbar from '../components/navbar';
import StatsDisplay from '../components/StatsDisplay';

export default function Home() {
  const stats = [
    { label: 'Makeup', count: 42 },
    { label: 'Perfumes', count: 15 },
    { label: 'Wishlist', count: 8 },
    { label: 'Looks', count: 5 },
  ];

  return (
    <>
      <Navbar />
      <main className="container">
        <h1 className="title-looktracker my-5">LookTracker</h1>
        <StatsDisplay stats={stats} />
      </main>
    </>
  );
}
