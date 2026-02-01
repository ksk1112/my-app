export {}; // VS Codeの再宣言エラー対策

// @ts-ignore
import express from 'express';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import cors from 'cors';

const app = express();

// JSONボディをパースできるようにする
app.use(express.json());
// ブラウザからのアクセスを許可
app.use(cors());

app.post('/api/calculate', async (req: any, res: any) => {
    console.log("バックエンド：計算リクエストを受け付けました。Goに問い合わせます...");
    const { num1, num2 } = req.body;

    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: "num1とnum2は数値である必要があります。" });
    }

    try {
        // Dockerネットワーク内のサービス名「specialist」でGoの足し算APIにPOSTリクエスト
        const response = await axios.post('http://specialist:8080/add', {
            num1: num1,
            num2: num2
        });
        
        res.json({
            message: "Backend(TS) から Goへ計算依頼完了！",
            go_calculation_result: response.data
        });
    } catch (error: any) {
        console.error("バックエンド：Goとの通信に失敗しました:", error.message);
        res.status(500).json({ error: "Goの計算サービスとの通信に失敗しました。" });
    }
});

app.listen(3000, () => {
    console.log('------------------------------------------');
    console.log('Backend TS (Calculator API) running on http://localhost:3000');
    console.log('------------------------------------------');
});