
let baseURL = 'https://blog-server.hunger-valley.com'

let key = 'cookie'

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: baseURL+url,
            method: type,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": wx.getStorageSync(key)
            },
            success: (res)=>{
                if (res.header) {
                    if ('Set-Cookie' in res.header) {
                        wx.setStorageSync(key, res.header['Set-Cookie']);
                    }
                    else if ('set-cookie' in res.header) {
                        wx.setStorageSync(key, res.header['set-cookie'])
                    }
                }
                resolve(res)
            },
            fail: (res) => {
                if (res.header) {
                    if ('Set-Cookie' in res.header) {
                        wx.setStorageSync(key, res.header['Set-Cookie']);
                    }
                    else if ('set-cookie' in res.header) {
                        wx.setStorageSync(key, res.header['set-cookie'])
                    }
                }
                reject(res)
            },
        }
        if (type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }
        wx.request(option)
    })
}