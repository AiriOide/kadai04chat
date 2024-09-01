    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
    import { getDatabase, ref, push, set, onChildAdded } 
    from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

    
    const firebaseConfig = {
        // あなたのFirebase設定をここに記述
        apiKey: "---",
        authDomain: "---",
        databaseURL: "---",
        projectId: "---",
        storageBucket: "---",
        messagingSenderId: "---",
        appId: "---"    
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbRef = ref(db, "chat");

    function sendMessage() {
        const msg = {
            uname: $("#uname").val(),
            text: $("#text").val(),
            timestamp: new Date().toLocaleString()
        }
        const newPostRef = push(dbRef);
        set(newPostRef, msg);
        $("#text").val("");
    }

    $("#send").on("click", sendMessage);

    $("#text").on("keydown", function(e) {
        if(e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    onChildAdded(dbRef, function(data) {
        const msg = data.val();
        const messageClass = msg.uname === $("#uname").val() ? "sent" : "received";
        let h = `
            <div class="message ${messageClass}">
                <div class="message-content">
                    <strong>${msg.uname}</strong><br>
                    ${msg.text}
                    <div class="message-info">${msg.timestamp}</div>
                </div>
            </div>
        `;
        $("#output").append(h);
        $("#output").scrollTop($("#output")[0].scrollHeight);
    });

    // 簡易翻訳機能（実際のAPIを使用する場合は、適切なAPIキーとエンドポイントを使用してください）
    const GOOGLE_TRANSLATE_API_KEY = '---'; // あなたのAPIキーに置き換えてください

$("#translate").on("click", function() {
    const text = $("#text").val();
    const targetLang = $("#target-lang").val();

    if (text) {
        translateText(text, targetLang);
    }
});

function translateText(text, targetLang) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${AIzaSyAjOyWWVAl5IV4bNd-xSDeD9oWHKl2xWLs}`;
    
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            q: text,
            target: targetLang
        },
        success: function(response) {
            if (response.data && response.data.translations && response.data.translations.length > 0) {
                const translatedText = response.data.translations[0].translatedText;
                $("#text").val(translatedText);
            }
        },
        error: function(xhr, status, error) {
            console.error('Translation error:', error);
            alert('翻訳中にエラーが発生しました。');
        }
    });
}
