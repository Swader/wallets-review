var currentApp;
let split = document.location.pathname.split("/");
let last = split.pop();
currentApp = (last.indexOf("html") > -1 || last === "") ? split.pop() : last;

for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].slug == currentApp) {

        $(".placeholder-label").text(wallets[i].label);

        let newDesc = ($(".meta-placeholder").text().replace(" - ", " - " + wallets[i].label + " "));
        $(".meta-placeholder").text(newDesc);
        $("meta[name=description]").attr("content", newDesc);

        $(".website a").attr("href", wallets[i].website);
        $(".download").attr("href", wallets[i].website);
        $(".website a").text(wallets[i].website);
        $(".download").text("Download " + wallets[i].label);
    }
}