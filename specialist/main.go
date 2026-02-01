package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestBody struct {
	Num1 int `json:"num1"`
	Num2 int `json:"num2"`
}

type ResponseBody struct {
	Result    int    `json:"result"`
	Operation string `json:"operation"`
	Message   string `json:"message"`
}

func main() {
	http.HandleFunc("/add", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			return
		}

		if r.Method != http.MethodPost {
			http.Error(w, "POST only", http.StatusMethodNotAllowed)
			return
		}

		var reqBody RequestBody
		err := json.NewDecoder(r.Body).Decode(&reqBody)
		if err != nil {
			http.Error(w, "Invalid body", http.StatusBadRequest)
			return
		}

		result := reqBody.Num1 + reqBody.Num2
		resBody := ResponseBody{
			Result:    result,
			Operation: "addition",
			Message:   fmt.Sprintf("%d と %d の計算結果です。", reqBody.Num1, reqBody.Num2),
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resBody)
	})

	fmt.Println("Go specialist (Add Calculator) running on :8080")
	http.ListenAndServe(":8080", nil)
}