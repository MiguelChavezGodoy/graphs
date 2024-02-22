import styles from "./page.module.css";
import XYsimple from "@/components/XYsimple/XYsimple";

export default function Home() {
  return (
    <main className={styles.main}>
      <XYsimple
        width={800}
        height={400}
      />
    </main>
  );
}
