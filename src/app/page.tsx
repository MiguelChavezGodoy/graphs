import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <a
          href="/graphs/xy-with-controls"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            XY GRAPH <span>-&gt;</span>
          </h2>
          <p>Full XY Graph with controls</p>
        </a>

        <a
          href="/graphs/simple"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            SIMPLE <span>-&gt;</span>
          </h2>
          <p>
            Simplified testing xy graph
          </p>
        </a>
      </div>
    </main>
  );
}
