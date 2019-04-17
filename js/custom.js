function populateWallets() {
    if (null === document.querySelector(".wallets")) {
        return false;
    }
    var template = document.querySelector('#maintemplate');
    var list = document.querySelector('.list-listings .row');
    var attrTpl = document.querySelector('#tagTemplate');

    for (var i = 0; i < wallets.length; i++) {
        var clone = document.importNode(template.content, true);

        clone.querySelector(".listing-title").innerText = wallets[i].label;
        clone.querySelector(".listing-title").href = "/apps/" + wallets[i].slug;
        clone.querySelector(".description").innerText = wallets[i].description;
        clone.querySelector(".recent-place-thumb object").data = "/apps/" + wallets[i].slug + "/logo.png";
        clone.querySelector(".recent-place-thumb a").href = "/apps/" + wallets[i].slug;

        var walletAttributes = wallets[i].attr;
        for (var j = 0; j < walletAttributes.length; j++) {
            var tagClone = document.importNode(attrTpl.content, true);

            clone.querySelector(".singleapp").setAttribute(
                "data-attributes", 
                (clone.querySelector(".singleapp").getAttribute("data-attributes") || "") + " " + walletAttributes[j]
            );

            var attributeExploded = walletAttributes[j].split("-");
            var attributeName = attributeExploded[0];
            var attributeValue = attributeExploded[1];
            
            var currentAttribute;
            var attributeClass = 'general';
            if (parseInt(attributeValue, 10) >= 0) {
                // Level attr
                currentAttribute = attributes[attributeName]['levels'][attributeValue];
                attributeClass = sentimentClasses[currentAttribute.sentiment];
            } else {
                // Multi attr
                currentAttribute = attributes[attributeName]['multi'][attributeValue];
            }
            
            if (attributeName == "chains") {
                var blackIconPath = "/images/cryptocurrency-icons/32/black/"+ attributeValue +".png";
                tagClone.querySelector(".attribute").innerHTML = "<a href='/coins.html#"+attributeValue+"'><img width='32' height='32' src='"+blackIconPath+"'></a>";
                $(tagClone.querySelector(".attribute")).addClass("chainIcon");
                tagClone.querySelector(".attribute").title = currentAttribute.label;
                clone.querySelector(".chain-list").appendChild(tagClone);
            } else {
                $(tagClone.querySelector(".attribute")).addClass(attributeClass);
                tagClone.querySelector(".attribute").innerHTML = "<a href='/attributes.html#"+attributeName+"'>"+currentAttribute.label+"</a>";
                tagClone.querySelector(".attribute").title = currentAttribute.description;
                clone.querySelector(".rated-list").appendChild(tagClone);
            }
        }

        list.appendChild(clone);
    }
}

function populateAttributes() {
    if (document.querySelector(".wallets")) {
        var row = document.querySelector(".filter-by-tags .row");
        var template = document.querySelector("#tagInFilterTemplate-radio");
        var template2 = document.querySelector("#tagInFilterTemplate-checkbox");
        var cbt = document.querySelector("#collapseButtonTemplate");
        var collapseDivTemplate = document.querySelector("#collapseDivTemplate");

        for (var key in attributes) {
            if (attributes.hasOwnProperty(key)) {

                var divClone = document.importNode(collapseDivTemplate.content, true);
                divClone.querySelector("div").setAttribute("id", key);

                // var cbtClone = document.importNode(cbt.content, true);
                // var button = cbtClone.querySelector("button");
                // button.setAttribute("data-target", key);
                // button.setAttribute("aria-controls", key);
                // button.innerText = key;
                // row.appendChild(cbtClone);

                // TODO Debug collapsibles. Right now the whole collapsible div that should house a category of filters
                // will be appended to the row empty, despite instructions below clearly telling divClone to append
                // children (i.e. attribute filters). They're not ending up inside the element, but as if appended to
                // row instead.

                if (undefined !== attributes[key]['levels']) {
                    // Levels mode
                    for (var j = 0; j < attributes[key]['levels'].length; j++) {

                        var id = key + "-" + j;

                        // Iterate through levels
                        var clone = document.importNode(template.content, true);
                        var input = clone.querySelector("input");
                        input.id = id;
                        input.value = id;
                        input.name = key;
                        
                        var label = clone.querySelector("label");
                        label.setAttribute("for", id);
                        label.innerText = attributes[key]['levels'][j].label;

                        divClone.appendChild(clone);
                    }
                    
                } else {
                    // Multi mode
                    for (var key2 in attributes[key]['multi']) {
                        if (attributes[key]['multi'].hasOwnProperty(key2)) {
                            var id = key + "-" + key2;

                            // Iterate through levels
                            var clone = document.importNode(template2.content, true);

                            var input = clone.querySelector("input");
                            input.id = id;
                            input.value = id;
                            input.name = id;
                            
                            var label = clone.querySelector("label");
                            label.setAttribute("for", id);
                            label.innerText = attributes[key]['multi'][key2].label;

                            divClone.appendChild(clone);
                        }
                    }
                }
                row.appendChild(divClone);
                row.innerHTML = row.innerHTML +"<div class='separator'></div>";
            }
        }
        initFiltering();
    }

    if ($(".faqs").length) {
        var attrTpl = document.querySelector('#tagTemplate');
        $(".faqs-box").each(function(i, el){
            var selectedAttribute = attributes[$(el).attr("data-attribute")];
            if (!selectedAttribute) {
                return "skip";
            }

            if (undefined !== selectedAttribute['multi']) {
                el.querySelector("div").innerHTML += "<p>A wallet can have multiple values of this attribute.</p>"
                for (var key in selectedAttribute['multi']) {
                    if (selectedAttribute['multi'].hasOwnProperty(key)) {
                        renderTag($(el).attr("data-attribute")+"-"+key, selectedAttribute.multi[key]);
                    }
                }
            } else {
                if (selectedAttribute.levels.length > 1) {
                    el.querySelector("div").innerHTML += "<p>A wallet can have only one value of this attribute.</p>"
                } else {
                    el.querySelector("div").innerHTML += "<p>This is a boolean attribute - a wallet either has it or doesn't.</p>"
                }
                for (var j = 0; j < selectedAttribute.levels.length; j++) {
                    renderTag(j, selectedAttribute.levels[j]);
                }
            }
            
            function renderTag(index, element) {
                var tagClone = document.importNode(attrTpl.content, true);
                var attributeClass = 'general';
                if (element.sentiment) {
                    attributeClass = sentimentClasses[element.sentiment];
                }

                if ("string" === typeof index && index.indexOf("chain") > -1) {
                    var attributeName = index.split("-")[0];
                    var attributeValue = index.split("-")[1];
                    var blackIconPath = "/images/cryptocurrency-icons/32/black/"+ attributeValue +".png";
                    tagClone.querySelector(".attribute").innerHTML = "<a href='/coins.html#"+attributeValue+"'><img width='32' height='32' src='"+blackIconPath+"'></a>";
                    $(tagClone.querySelector(".attribute")).addClass("chainIcon");
                    tagClone.querySelector(".attribute").title = element.label;
                } else {
                    $(tagClone.querySelector(".attribute")).addClass(attributeClass);
                    tagClone.querySelector(".attribute").innerHTML = "<a href='#'>"+element.label+"</a>";
                    tagClone.querySelector(".attribute").title = element.description;
                }
                el.querySelector("div").appendChild(tagClone);
    
            }

        });
    }

    if ($(".category-widget").length) {
        var attrTpl = document.querySelector('#tagTemplate');
        for (var i = 0; i < wallets.length; i++) {
            if (wallets[i].slug == currentApp) {
                // App selected
                var attrs = wallets[i].attr;
                for (var j = 0; j < attrs.length; j++) {
                    var tagClone = document.importNode(attrTpl.content, true);

                    var element = attrs[j];
                    
                    var attributeExploded = attrs[j].split("-");
                    var attributeName = attributeExploded[0];
                    var attributeValue = attributeExploded[1];
                    
                    var currentAttribute;
                    var attributeClass = 'general';
                    if (parseInt(attributeValue, 10) >= 0) {
                        // Level attr
                        currentAttribute = attributes[attributeName]['levels'][attributeValue];
                        attributeClass = sentimentClasses[currentAttribute.sentiment];
                    } else {
                        // Multi attr
                        currentAttribute = attributes[attributeName]['multi'][attributeValue];
                    }
                    
                    if (attributeName == "chains") {
                        var blackIconPath = "/images/cryptocurrency-icons/32/black/"+ attributeValue +".png";
                        tagClone.querySelector(".attribute").innerHTML = "<a href='/coins.html#"+attributeValue+"'><img width='32' height='32' src='"+blackIconPath+"'></a>";
                        $(tagClone.querySelector(".attribute")).addClass("chainIcon");
                        tagClone.querySelector(".attribute").title = currentAttribute.label;
                    } else {
                        $(tagClone.querySelector(".attribute")).addClass(attributeClass);
                        tagClone.querySelector(".attribute").innerHTML = "<a href='/attributes.html#"+attributeName+"'>"+currentAttribute.label+"</a>";
                        tagClone.querySelector(".attribute").title = currentAttribute.description;

                        tagClone.querySelector("div").innerHTML += "<div class='attribute-special-description'>"+currentAttribute.description;+"</div>";
                        //document.querySelector(".category-widget").appendChild(tagClone);
                        document.querySelector(".category-widget").innerHTML += tagClone.querySelector("div").innerHTML;
                    }
                    
                    
                    
                }
            }
        }
    }
}

function initFiltering() {
    $("#resetFilters").click(resetFilters);
    $(".do-tonight-sec a").on("click", function(e){
        resetFilters();
        var attr = $(e.currentTarget).attr("data-attribute");
        $(".arrow-down.floating").click();
        $("input#"+attr).click();
    });
    $(".filter-by-tags input").on("change", function(e){
        var arrayOfSelectedTags = [];
        $(".filter-by-tags input:checked").each(function(i, el){
            arrayOfSelectedTags.push($(el).attr("id"));
        });
        
        $(".singleapp").each(function(i, el){
            var presentTags = $(el).attr("data-attributes").trim().split(" ");
            var hasNeededTags = arrayOfSelectedTags.every(elem => presentTags.indexOf(elem) > -1);
            if (!hasNeededTags) {
                $(el).hide();
            } else {
                $(el).show();
            }
        });
    });
}

function resetFilters() {
    $(".filter-by-tags input").prop("checked", false).change();
}

function populateMenus() {
    if ($(".appMenuList")) {
        for (var i = 0; i < wallets.length; i++) {
            var newItem = "<li><a href='/apps/"+ wallets[i].slug +"'>"+ wallets[i].label +"</a></li>";
            document.querySelectorAll(".appMenuList")[0].innerHTML += newItem;
        }
    }
}

function populateCoins() {
    if ($(".coins").length) {
        var template = document.querySelector("#coinTemplate");
        for (key in attributes['chains']['multi']) {
            if (attributes['chains']['multi'].hasOwnProperty(key)) {
                var clone = document.importNode(template.content, true);
                clone.querySelector("img").src = "/images/cryptocurrency-icons/32@2x/black/" + key + "@2x.png";
                clone.querySelector(".number").innerText = key.toUpperCase();
                clone.querySelector(".work-detail h3").innerText = attributes['chains']['multi'][key].label;
                clone.querySelector(".how-it-works").id = key;
                clone.querySelector(".work-detail div.description").innerHTML = makeDescription(attributes['chains']['multi'][key].description);
                clone.querySelector(".work-detail ul").innerHTML = listLinks(attributes['chains']['multi'][key].links);
            }
            document.querySelector(".coins").appendChild(clone);
        }

    }
}

function listLinks(jso) {
    var litems = "";
    for (key in jso) {
        if (jso.hasOwnProperty(key)) {
            var obj = jso[key];
            litems += "<li><a target='_blank' href='"+obj.href+"' title='"+obj.title+"'>"+obj.title+"</a></li>"
        }
    }
    return litems;
}

function makeDescription(paragraphs) {
    if ("string" === typeof paragraphs) {
        paragraphs = [paragraphs];
    }
    var desc = '';
    for (var i = 0; i < paragraphs.length; i++) {
        desc += "<p>" + paragraphs[i] + "</p>";
    }
    return desc;
}

var sentimentClasses = {
    "-1": "n2",
    "-0.5": "n1",
    "0": "general",
    "0.5": "p1",
    "1": "p2"
}

$(document).ready(function(){
    populateWallets(); 
    populateAttributes();
    populateMenus();
    populateCoins();
});

var wallets = [
    {
        "label": "Status",
        "website": "https://status.im",
        "description": "Status is a decentralized messenger for Ethereum with a built-in dapp browser and crypto wallet.",
        "attr": [
            "censorship-3", 
            "dapps-2", 
            "ux-1", 
            "chains-eth", 
            "custom_net-2", 
            "os-ios", 
            "os-android", 
            "open_source-2", 
            "keys-2", 
            "stability-0"
        ],
        "slug": "status"
    },
    {
        "label": "Opera",
        "website": "https://opera.com",
        "description": "A mainstream browser turned crypto-friendly, Opera now supports a wide range of Ethereum blockchain operations",
        "attr": [
            "censorship-0",
            "dapps-2",
            "ux-3",
            "chains-eth", 
            "custom_net-2", 
            "os-android",
            "custom_token-erc20",
            "custom_token-erc721",
            "open_source-0",
            "keys-1",
            "stability-2"
        ],
        "slug": "opera"
    },
    {
        "label": "Trust Wallet",
        "website": "https://trustwallet.com/",
        "description": "A multi-chain wallet acquired by Binance with some advanced features like coin staking and more",
        "attr": [
            "censorship-1", 
            "dapps-2", 
            "ux-3", 
            "multichain-0",
            "chains-eth",
            "chains-btc",
            "chains-etc",
            "chains-go",
            "chains-poa",
            "chains-vet",
            "chains-trx",
            "chains-wan",
            "chains-clo",
            "chains-ltc",
            "chains-bch",
            "chains-tomo",
            "chains-dash",
            "chains-zec",
            "chains-xzc",
            "chains-xrp",
            "chains-kin",
            "chains-nim",
            "chains-tt",
            "chains-aion",
            "custom_net-0",
            "os-ios",
            "os-android",
            "custom_token-erc20",
            "custom_token-erc721",
            "open_source-1",
            "keys-1",
            "stability-2",
            "authentication-biometric"
        ],
        "slug": "trust"
    }]


var attributes = {

        "censorship": {
            "levels": [
                {
                    "label": "Highly censorable",
                    "sentiment": -1,
                    "description": "A single party can decide you no longer have access to the blockchain"
                },
                {
                    "label": "Censorable",
                    "sentiment": -0.5,
                    "description": "A coordinated attack or a large scale system failure will prevent you from accessing the blockchain",
                },
                {
                    "label": "Uncensorable",
                    "sentiment": 0.5,
                    "description": "It's very difficult to prevent this app from working. A coordinated attack on a large scale is necessary."
                },
                {
                    "label": "Unstoppable",
                    "sentiment": 1,
                    "description": "This application is essentially as resilient as the blockchain it connects to."
                }
            ],
            "description": "How hard would it be for someone to stop you from using this app?"
        },

        "dapps": {
            "levels": [
                {
                    "label": "No dapps",
                    "sentiment": -0.5,
                    "description": "No dapp support, wallet only."
                },                
                {
                    "label": "Blockchain 1.0",
                    "sentiment": 0,
                    "description": "The underlying blockchain is lacking features that would support a dapp ecosystem."
                },
                {
                    "label": "Basic Dapps",
                    "sentiment": 0.5,
                    "description": "Basic Web3 or equivalent is injected into the browser by the wallet."
                },
                {
                    "label": "Advanced Dapps",
                    "sentiment": 1,
                    "description": "A feature rich dapp browser with a rich ecosystem and/or excellent web3 functionality available."
                }
            ]
        },

        "ux": {
            "levels": [
                {
                    "label": "Hard to use",
                    "sentiment": -1,
                    "description": "This app is difficult or frustrating to use and requires patience or technical expertise."
                },
                {
                    "label": "UX lacking",
                    "sentiment": -0.5,
                    "description": "Stability issues or UX uncertainties plague this app."
                },
                {
                    "label": "Good UX",
                    "sentiment": 0.5,
                    "description": "This app is relatively easy to use."
                },
                {
                    "label": "Excellent UX",
                    "sentiment": 1,
                    "description": "This app is extremely intuitive and newbie friendly."
                },
            ]
        },

        "multichain": {
            "levels": [
                {
                    "label": "Supports multiple blockchains",
                    "sentiment": 1,
                    "description": "This wallet can be used to interact with several different blockchains."
                }
            ]
        },

        "chains": {
            "multi": {
                "eth": {
                    "label": "Ethereum",
                    "description": ["The first advanced blockchain featuring truly programmable money.","Arguably the most advanced secure blockchain today with version 2.0 on the way. Find out more at Two Point Oh (link below)."],
                    "links": [
                        {
                            title: "Website",
                            href: "https://ethereum.org"
                        },
                        {
                            title: "Detailed introduction",
                            href: "https://bitfalls.com/2017/09/19/what-ethereum-compare-to-bitcoin/"
                        },
                        {
                            title: "Official Subreddit",
                            href: "https://reddit.com/r/ethereum"
                        },
                        {
                            title: "Two Point Oh: Ethereum 2.0 explainers",
                            href: "https://our.status.im/tag/two-point-oh"
                        }
                    ]
                },
                "etc": {
                    "label": "Ethereum Classic",
                    "description": "A version of Ethereum that kept a controversial incident in the blockchain's history instead of deleting it. The majority of the ecosystem went with the deletion.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://ethereumclassic.org/"
                        }
                    ]
                },
                "go": {
                    "label": "GoChain",
                    "description": "Enterprise focused web3-oriented blockchain.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://gochain.io/"
                        }
                    ]
                },
                "poa": {
                    "label": "POA Network",
                    "description": "A side-chain for Ethereum facilitating faster and cheaper, but less secure transactions.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://poa.network/"
                        }
                    ]
                },
                "wan": {
                    "label": "Wanchain",
                    "description": "A distributed financial infrastructure that seamlessly connects blockchain networks together",
                    "links": [
                        {
                            title: "Website",
                            href: "https://wanchain.org/"
                        }
                    ]
                },
                "clo": {
                    "label": "Callisto",
                    "description": "A version of Ethereum focused on inflationary earnings.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://callisto.network/"
                        }
                    ]
                },
                "icx": {
                    "label": "Icon",
                    "description": "A proof-of-authority for-profit blockchain/company.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://icon.foundation"
                        }
                    ]
                },
                "vet": {
                    "label": "VeChain",
                    "description": "A proof-of-authority for-profit blockchain/company.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://www.vechain.org/"
                        }
                    ]
                },
                "eos": {
                    "label": "EOS",
                    "description": "A proof-of-authority for-profit blockchain/company.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://eos.io/"
                        }
                    ]
                },
                "ltc": {
                    "label": "Litecoin",
                    "description": "A slightly modified copy of Bitcoin. Effectively bitcoin's testnet.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://litecoin.org/"
                        }
                    ]
                },
                "tomo": {
                    "label": "TomoChain",
                    "description": "A masternoded version of Ethereum",
                    "links": [
                        {
                            title: "Website",
                            href: "https://tomochain.com/"
                        }
                    ]
                },
                "dash": {
                    "label": "DASH",
                    "description": "Masternoded version of Bitcoin with optional privacy and high throughput.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://www.dash.org/"
                        }
                    ]
                },
                "zec": {
                    "label": "Zcash",
                    "description": "Zcash is a privacy-protecting, digital currency built on strong science.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://z.cash/"
                        }
                    ]
                },
                "xzc": {
                    "label": "Zcoin",
                    "description": "Private financial transactions, enabled by the Zerocoin Protocol.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://zcoin.io/"
                        }
                    ]
                },
                "trx": {
                    "label": "Tron",
                    "description": "A centralized and private version of Ethereum run on a single permissioned server.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://tron.network/"
                        }
                    ]
                },
                "xrp": {
                    "label": "Ripple",
                    "description": "Centralized attempt at a global remittance network",
                    "links": [
                        {
                            title: "Website",
                            href: "https://ripple.com/"
                        }
                    ]
                },
                "kin": {
                    "label": "Kin",
                    "description": "App-focused currency. Integration into products is focus.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://www.kin.org/"
                        }
                    ]
                },
                "nim": {
                    "label": "Nimiq",
                    "description": "A blockchain technology inspired by Bitcoin but designed to run in your browser. It is a fast and easy means of payment.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://nimiq.com"
                        }
                    ]
                },
                "tt": {
                    "label": "Thunder Token",
                    "description": "An EVM-compatible proof of stake chain.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://www.thundercore.com/"
                        }
                    ]
                },
                "aion": {
                    "label": "Aion",
                    "description": "Yet another superlative-packed web3 blockchain.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://aion.network/"
                        }
                    ]
                },
                "xlm": {
                    "label": "Stellar",
                    "description": "A more open version of Ripple. Global remittance network, decentralized and with token support.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://www.stellar.org/"
                        }
                    ]
                },
                "btc": {
                    "label": "Bitcoin",
                    "description": "The first blockchain.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://bitcoin.org/en/"
                        }
                    ]
                },
                "bch": {
                    "label": "Bitcoin Cash",
                    "description": "Bitcoin but faster, cheaper, smarter, and somewhat less secure.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://bitcoin.com"
                        }
                    ]
                },
                "xtz": {
                    "label": "Tezos",
                    "description": "A proof of stake web3 blockchain with full on-chain governance.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://tezos.com/"
                        }
                    ]
                },
                "ada": {
                    "label": "Cardano",
                    "description": "An in-development Proof of Stake web3 blockchain.",
                    "links": [
                        {
                            title: "Website",
                            href: "https://www.cardano.org/en/home/"
                        }
                    ]
                },
            }
        },

        "custom_net": {
            "levels": [
                {
                    "label": "No custom node support",
                    "sentiment": -0.5,
                    "description": "You cannot use your own node or a custom network."
                },
                {
                    "label": "Custom node",
                    "sentiment": 0.5,
                    "description": "You can connect this app to your own node but only to mainnet or predefined testnets."
                },
                {
                    "label": "Custom node and network ID",
                    "sentiment": 1,
                    "description": "You can connect to any network ID and custom node URL, from private PoA to mainnet."
                }
            ]
        },

        "os": {
            "multi": {
                "ios": {
                    "label": "iOS",
                    "description": "iOS 10+ supported"
                },
                "android": {
                    "label": "Android",
                    "description": "Android 8+ supported"
                },
                "web": {
                    "label": "Web version",
                    "description": "A web UI on par with features in the mobile app"
                },
                "desktop-win": {
                    "label": "Desktop (Windows)",
                    "description": "A desktop UI on par with features in the mobile app"
                },
                "desktop-lin": {
                    "label": "Desktop (Linux)",
                    "description": "A desktop UI on par with features in the mobile app"
                },
                "desktop-osx": {
                    "label": "Desktop (OS X)",
                    "description": "A desktop UI on par with features in the mobile app"
                },
            }
        },

        "custom_token": {
            "multi": {
                "erc20": {
                    "label": "ERC20",
                    "description": "Custom tokens matching the ERC20 interface can be added to the built-in list, or are auto-detected.",
                    "sentiment": 1
                },
                "erc721": {
                    "label": "ERC721",
                    "description": "Custom collectibles (NFTs) adhering to the ERC721 interface can be added to the built-in list, or are auto-detected.",
                    "sentiment": 1
                }
            }
        },

        "open_source": {
            "levels": [
                {
                    "label": "Closed Source",
                    "sentiment": -0.5,
                    "description": "This application's source cannot be inspected. You trust that it does what it says it does."
                },
                {
                    "label": "Partially Open Source",
                    "sentiment": 0.5,
                    "description": "Some parts of this application are open source and available for inspection."
                },
                {
                    "label": "Open Source",
                    "sentiment": 1,
                    "description": "This application is completely open source."
                }
            ]
        },

        "keys": {
            "levels": [
                {
                    "label": "Custody 🔑",
                    "sentiment": -1,
                    "description": "The user is not in control of their keys or private keys are sent to any server at any point in time."
                },
                {
                    "label": "Risky 🔑",
                    "sentiment": -0.5,
                    "description": "It is not known if the browser sends a user's private keys to a server. This can be because the app enforces a VPN or is closed source.."
                },
                {
                    "label": "Own 🔑",
                    "sentiment": 1,
                    "description": "The user is in full control of their keys, either directly or through a recovery phrase."
                }
            ]
        },

        "stability" : {
            "levels": [
                {
                    "label": "In development",
                    "sentiment": -0.5,
                    "description": "The app should not be considered stable. Bugs happen and things can break."
                },
                {
                    "label": "Beta",
                    "sentiment": 0,
                    "description": "The feature set is complete and the bug-hunt is on. App is stable enough."
                },
                {
                    "label": "Stable",
                    "sentiment": 1,
                    "description": "The application should be considered stable and safe to use."
                },
            ]
        },

        "authentication": {
            "multi": {
                "hw": {
                    "label": "Hardware wallet",
                    "description": "Application supports authentication through some manner of hardware wallet like Status Keycard, Trezor, Ledger Nano or similar."
                },
                "yubikey": {
                    "label": "Yubikey",
                    "description": "User can authenticate using a Yubikey."
                },
                "biometric": {
                    "label": "Biometric",
                    "description": "User can authenticate using face scan, fingerprint scan, or iris scan."
                }
            }
        }


}