/**
     * 指定したcookieのキーの値を取り出す。デフォルトはscratchcsrftoken。
     * @param {string} key cookieのキーの名前
     * @returns {string} cookieの値
     */
    function getCookieValue(key) {
        if (key !== "") {
            var req = key
        } else {
            var req = "scratchcsrftoken"
        }
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            var cookiesArray = cookie.split('=');
            if (cookiesArray[0].trim() == req.trim()) {
                return cookiesArray[1];
            }
        }
        return '';
    }
    /**
     * 誰得() プロジェクトの作者を取得するだけ。fetch使ってるのでawait必須。
     * @param {string} projectid プロジェクトIDぶち込め。
     * @returns {string} ユーザー名。
     */
    async function getTargetUserName(projectid) {
        var str = "";
        var returnstr = "";
        await fetch(`https://api.scratch.mit.edu/projects/${projectid}/`, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "ja,en-US;q=0.9,en;q=0.8",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        }).then(function (response) {
            str = response.json();
            returnstr = str.author.username;
        });
        return returnstr;
    }
