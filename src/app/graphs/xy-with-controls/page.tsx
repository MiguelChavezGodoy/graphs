import styles from "./page.module.css";
import XYwithControls from "@/components/XYwithControls/XYwithControls";

export default function Home() {
  return (
    <main className={styles.main}>
      <XYwithControls width={800} height={400} />
    </main>
  );
}
