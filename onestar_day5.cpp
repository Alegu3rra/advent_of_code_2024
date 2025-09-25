#include <bits/stdc++.h>

using namespace std;

bool valid(const vector<int>& actualizacion, const unordered_map<int, unordered_set<int>>& antes) {
    unordered_map<int, int> coordenada;
    
    for (const auto& pagActual : actualizacion) {
        coordenada[pagActual] = 0;
    }

    for (const auto& pagActual : actualizacion) {
        if (antes.find(pagActual) != antes.end()) {
            for (const auto& pagSig : antes.at(pagActual)) {
                if (coordenada.find(pagSig) != coordenada.end()) {
                    coordenada[pagSig]++;
                }
            }
        }
    }

    queue<int> q;
    for (const auto& entry : coordenada) {
        if (entry.second == 0) {
            q.push(entry.first);
        }
    }

    vector<int> ordenados;
    while (!q.empty()) {
        int pagActual = q.front();
        q.pop();
        ordenados.push_back(pagActual);

        for (const auto& pagSig : antes.at(pagActual)) {
            coordenada[pagSig]--;
            if (coordenada[pagSig] == 0) {
                q.push(pagSig);
            }
        }
    }
    return ordenados == actualizacion;
}

int fnMediaPag(const vector<int>& actualizacion) {
    int n = actualizacion.size();
    return actualizacion[n / 2];
}

int main() {

    vector<pair<int, int>> reglas1 = {};
    vector<vector<int>> reglas2 = {};

    string renglon = "";
    while (getline(cin, renglon)) {
        istringstream iss(renglon);
        vector<int> par;
        int num;
        while (iss >> num) {
            par.push_back(num);
        }
        reglas1.push_back({par[0], par[1]});
    }

    string renglonDiff = "";
    while (getline(cin, renglonDiff)) {
        istringstream iss(renglonDiff);
        vector<int> par;
        int num;
        while (iss >> num) {
            par.push_back(num);
        }
        reglas2.push_back(par);
    }

    unordered_map<int, unordered_set<int>> antes;
    for (const auto& rule : reglas1) {
        antes[rule.first].insert(rule.second);
    }

    int sumaMediaPag = 0;

    for (const auto& actualizacion : reglas2) {
        if (valid(actualizacion, antes)) {
            int middlepagActual = fnMediaPag(actualizacion);
            sumaMediaPag += middlepagActual;
        }
    }

    cout << sumaMediaPag << endl;

    return 0;
}