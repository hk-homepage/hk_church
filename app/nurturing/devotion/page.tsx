import { redirect } from "next/navigation"

// 오늘의 묵상은 복있는사람들(qtland) 사이트로 연결
const QT_DEVOTION_URL = "https://www.qtland.com/quiet/quiet.php?cate=A"

export default function DevotionPage() {
  redirect(QT_DEVOTION_URL)
}
