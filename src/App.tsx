import { BlogList } from "./components/BlogList";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>My Blog</h1>
      </header>

      <main className="content">
        {/* Candidate implements all fetching, state, and layout inside BlogList */}
        <BlogList />
      </main>
    </div>
  );
}
