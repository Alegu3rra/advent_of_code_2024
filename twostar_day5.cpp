#include <bits/stdc++.h>

using namespace std;

pair<map<int, vector<int>>, vector<vector<int>>> parse_input() {
    map<int, vector<int>> dependency;
    vector<vector<int>> list_pages;
    string line;

    while (getline(cin, line)) {
        line.erase(remove(line.begin(), line.end(), '\r'), line.end()); // Handle Windows-style line endings

        if (line.find('|') != string::npos) {
            istringstream iss(line);
            int key, value;
            char delim;
            
            iss >> key >> delim >> value;

            if (delim == '|') {
                dependency[key].push_back(value);
            }
        } else if (line.find(',') != string::npos) {
            istringstream iss(line);
            vector<int> pages;
            int page;
            char delim;

            while (iss >> page) {
                pages.push_back(page);
                if (!(iss >> delim) || delim != ',') {
                    break;
                }
            }

            list_pages.push_back(pages);
        }
    }

    return {dependency, list_pages};
}