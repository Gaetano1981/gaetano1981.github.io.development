(function(){
	//https://github.com/blog/1509-personal-api-tokens

        var githubApi = {};
        githubApi.header = {};
        githubApi.header.Accept = "application/vnd.github.v3+json"; //make sure we use v3
        githubApi.header.Authorization = "token <token>";
        githubApi.baseUrl = "https://api.github.com";
        githubApi.username = "";
        githubApi.nameRepo = "";
        githubApi.sha = "";
        githubApi.path = "";
        githubApi.newFile = false;

        function apiRequest(method, url, jsonData, callback) {

            //load the json file
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        callback(xhr.responseText);
                    }
                    else {
                        cout(xhr.status);
                        cout(xhr.responseText);
                    }
                }
            }
            xhr.open(method, url, true);
            for (var key in githubApi.header) {
                xhr.setRequestHeader(key, githubApi.header[key]);
            }
            xhr.send(jsonData);
        }

        function saveUserInfo() {

            githubApi.username = 'Gaetano1981';
            githubApi.nameRepo = 'GitHubREST';
            githubApi.header.Authorization = "token 2c27f9a48375523a43de2205954d2ebfb41e16db";
        }

        function cout(str) {
            //var csl = document.getElementById("consoleOut");
            //csl.value += (str + "\n\n");
            //csl.scrollTop = csl.scrollHeight //autoscroll to end;
        }

        function getfile(url, path) {

            apiRequest("GET", url, null, function (r) {
                var jsonRsp = JSON.parse(r);
                if (jsonRsp.encoding != "base64") {
                    cout("unknown encoding " + jsonRsp.encoding);
                    return;
                }
                githubApi.sha = jsonRsp.sha;
                githubApi.path = path;
                githubApi.newFile = false;
            });
        }

        function newFile() {

            githubApi.newFile = true;
            githubApi.path = (new Date()).getTime().toString() + '.txt';
        }

        function list() {

            saveUserInfo();
            //get tree url from master branch's last commit
            var url = githubApi.baseUrl + "/repos/" + githubApi.username + "/" + githubApi.nameRepo + "/branches/master";
            apiRequest("GET", url, null, function (r) {
                var jsonRsp = JSON.parse(r);
                var treeUrl = jsonRsp.commit.commit.tree.url + "?recursive=1";
                //get tree
                apiRequest("GET", treeUrl, null, function (r) {
                    var jsonRsp = JSON.parse(r);
                    var cnt = document.getElementById("listContainer");
                    cnt.innerHTML = ""; //clear
                    //create li list elements
                    for (var i in jsonRsp.tree) {
                        var li = document.createElement("li");
                        li.url = jsonRsp.tree[i].url;
                        li.path = jsonRsp.tree[i].path;
                        li.innerHTML = li.path;
                        li.onclick = function () { getfile(this.url, this.path) };
                        cnt.appendChild(li);
                    }
                });
            });
        }

        function commitAndPush() {

            saveUserInfo();

						var unique_id = (new Date()).getTime().toString();

						var data = {
							'unique_id': unique_id,
							'appVersion': window.navigator.appVersion
						};

            var jsonData = new Object();
            jsonData.message = unique_id;
            jsonData.content = btoa(JSON.stringify(data)); //encode64
            jsonData.path = githubApi.path;
            jsonData.branch = "master";
            if (!githubApi.newFile) {
                jsonData.sha = githubApi.sha;
            }
            var url = githubApi.baseUrl + "/repos/" + githubApi.username + "/" + githubApi.nameRepo + "/contents/" + githubApi.path;
            jsonData = JSON.stringify(jsonData); //api expects json as string
            cout(jsonData);
            apiRequest("PUT", url, jsonData, function (r) {
                cout(r);
            });
        }

        newFile();
        commitAndPush();
})();