var i = 0;
var interval = setupInterval()
function setupInterval() {
    if (window.location.href.match("/activitystudy/web-report") == null) {
        console.log("not web-report page, stopInterval")
        return
    }
    return setInterval(function () {
        i++;
        console.log(i)
        if (document.getElementsByClassName("hierarchy").length != 0) {
            console.log("Load successfully!")
            clearInterval(interval)
            interval = null;
            setTimeout(execPopupRecommend, 1000)
        }
        if (i > 100) {
            console.log("try 100 times, clear interval action.")
            clearInterval(interval)
            interval = null;
        }
    }, 100)
}
function execPopupRecommend() {
    if (checkAllScorePublished()) {
        document.ext_functions_plaza()
        if (window.location.href.match("ext_hide_username") != null)
            setTimeout(function () {
                document.getElementById("userName").textContent = "海蓝色的咕咕鸽"
            }, 500)


        var parent_div = document.getElementsByClassName("hierarchy")[0]
        var recommend_div = document.createElement("div")
        recommend_div.className = "ext_recommend_div"
        parent_div.after(recommend_div)
        var text_div = createElementEx("div", "ext_recommend_text", recommend_div)
        text_div.innerText = "需要智学网插件的帮助吗？"
        var classrank_button = createElementEx("div", "ext_recommend_button", text_div)
        var fullscore_button = createElementEx("div", "ext_recommend_button", text_div)
        document.ext_editmode = false
        var editmode_button = createElementEx("div", "ext_recommend_button", text_div)
        editmode_button.onclick = editModeButton
        editmode_button.innerText = "进入编辑分数模式"
        editmode_button.setAttribute("id", "ext_btn_editmode")
        document.recommend_div = recommend_div
        var hide_button = createElementEx("div", "ext_recommend_button", text_div)
        hide_button.innerText = "隐藏"
        classrank_button.innerText = "查看班级排名"
        fullscore_button.innerText = "一键满分"
        hide_button.onclick = hideButton
        classrank_button.onclick = classrankButton
        fullscore_button.onclick = fullscoreButton
        var douyin_button = createElementEx("div", "ext_recommend_button", text_div)
        douyin_button.innerText = "看看作者的抖音 >>"
        douyin_button.onclick = function () {
            window.open("https://www.douyin.com/user/MS4wLjABAAAApuyqymIaQkpvKkbdH1X6W3A6XEgJl7kddGrZHxipJ7TbA1lCRaPJK5gZ1KX7pR1n")
        }
        var tips = createElementEx("div", "ext_recommend_tips", recommend_div)
        var version = chrome.runtime.getManifest().version
        tips.innerText = "插件功能由 ZhixuewangScoreExt(v" + version + ") 提供，并非官方提供的功能。 @海蓝色的咕咕鸽 (@aquamarine5, RenegadeCreation)"
        var github_repo = createElementEx("a", "ext_recommend_link", tips)
        github_repo.setAttribute("href", "https://github.com/aquamarine5/ZhixuewangScoreExt")
        github_repo.setAttribute("target", "_blank")
        github_repo.innerText = "Github 项目地址"
        if (window.location.href.match("ext_no_notice") == null) {
            var notice_div = createElementEx("div", "ext_recommend_notice_div", recommend_div)
            var notice_container = createElementEx("div", "ext_recommend_notice_container", notice_div)
            var notice_img = createElementEx("img", "ext_recommend_notice_img", notice_container)
            notice_img.setAttribute("src", chrome.runtime.getURL("images/tips_info.png"))
            var notice_text = createElementEx("span", "ext_recommend_notice_text", notice_container)
            notice_text.textContent = "作者已经高考结束不再使用智学网，未来可能不会在继续进行新功能更新 2021.12.18➡️2024.07.12"
        }
        var dropdownlist = $(".el-select-dropdown__list li")
        for (let index = 0; index < dropdownlist.length; index++) {
            const element = dropdownlist[index];
            element.onclick = function () {
                clearInterval(interval)
                interval = setupInterval()
            }
        }
    }
}
function onEditmodeButtonClicked() {
    const obj = event.currentTarget
    console.log(this)
    var score = parseFloat(obj.getAttribute("score"))
    var subjectScore = obj.parentNode.parentNode.getElementsByClassName('blue')[0]
    subjectScore.textContent = parseFloat(subjectScore.textContent) + score
    var totalScore = document.getElementsByClassName('general')[0].getElementsByClassName('increase')[0]
    totalScore.textContent = parseFloat(totalScore.textContent) + score
    document.ext_functions_plaza()
}
function editModeButton() {
    if (document.ext_editmode == undefined) document.ext_editmode = false
    function createButtonEx2(tagName, className, parent_div, score, textContent, subjectIndex) {
        var item = createElementEx(tagName, className, parent_div)
        item.setAttribute("score", score)
        item.setAttribute("subjectIndex", subjectIndex)
        item.textContent = textContent
        item.onclick = onEditmodeButtonClicked
        return item
    }
    var editmodeButton = document.getElementById("ext_btn_editmode")
    if (!document.ext_editmode) {
        editmodeButton.textContent = "退出编辑分数模式"
        var subjectItems = document.getElementsByClassName("sub-item")
        for (let index = 0; index < subjectItems.length; index++) {
            const element = subjectItems[index];
            var container = createElementEx("div", "ext_editmode_container", element)

            createButtonEx2("div", "ext_editmode_btn_minus", container, "-5", "-5", index.toString())
            createButtonEx2("div", "ext_editmode_btn_minus", container, "-1", "-1", index.toString())

            createButtonEx2("div", "ext_editmode_btn_plus", container, "0.5", "+0.5", index.toString())
            createButtonEx2("div", "ext_editmode_btn_plus", container, "1", "+1", index.toString())
            createButtonEx2("div", "ext_editmode_btn_plus", container, "5", "+5", index.toString())
        }
    } else {
        editmodeButton.textContent = "进入编辑分数模式"
        for (let index = 0; index < 4; index++) {
            var editmodeContainers = document.getElementsByClassName("ext_editmode_container")
            for (let index = 0; index < editmodeContainers.length; index++) {
                const element = editmodeContainers[index];
                element.remove()
            }
            if (document.getElementsByClassName("ext_editmode_container").length == 0) break;
        }
    }
    document.ext_editmode = !document.ext_editmode
}

function hideButton() {
    document.getElementsByClassName("ext_recommend_div")[0].remove()
}

function classrankButton() {
    document.ext_functions_getRank(null, function (_) { })
}
function fullscoreButton() {
    document.ext_functions_report_detail({
        type: "FullMarkCallback",
        image_url: {
            "default": chrome.runtime.getURL("images/fullmark_analyse_9.png"),
            "6": chrome.runtime.getURL("images/fullmark_analyse_6.png"),
            "9": chrome.runtime.getURL("images/fullmark_analyse_9.png")
        },
        scoreRanks: [
            chrome.runtime.getURL("images/full_scoreRank_1.png"),
            chrome.runtime.getURL("images/full_scoreRank_2.png"),
            chrome.runtime.getURL("images/full_scoreRank_3.png"),
            chrome.runtime.getURL("images/full_scoreRank_4.png"),
            chrome.runtime.getURL("images/full_scoreRank_5.png")
        ]
    }, function (_) { })
}
function createElementEx(tagName, className, parent) {
    var e = document.createElement(tagName)
    e.className = className
    parent.appendChild(e)
    return e
}

function checkAllScorePublished() {
    return document.getElementsByClassName("subject_analysis_div").length != 0
}
