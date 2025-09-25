// 7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2. - true
// 1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
// 9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
// 1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
// 8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
// 1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
// So, in this example, 2 reports are safe.

#include <iostream>
#include <sstream>
#include <vector>

using namespace std;

int main() {
    vector<vector<int>> matriz;
    string renglon;
    //lectura
    while (getline(cin, renglon)) {
        istringstream iss(renglon);
        vector<int> fila;
        int num;
        while (iss >> num) {
            fila.push_back(num);
        }
        matriz.push_back(fila);
    }
    // contador de safe
    long int safeCount = 0;
    for (const auto& fila : matriz) {
        // última diferencia
        long int lastDiff = -1;
        long int isUpOrDown = 2;
        long int increasing = -1;
        for (int i = 0; i < fila.size()-1; i++) {

            if(fila[i] > fila[i+1]){
                cout << "down ";
                if(increasing == -1 || increasing == 0) {
                    lastDiff = fila[i] - fila[i+1];
                    increasing = 0;
                } else {
                    isUpOrDown --;
                    continue;
                }
            }
            if(fila[i] < fila[i+1]){
                cout << "up ";
                if(increasing == -1 || increasing == 1) {
                    lastDiff = fila[i+1] - fila[i];
                    increasing = 1;
                } else {
                    isUpOrDown --;
                    continue;
                }
            }
            if(fila[i] == fila[i+1]){
                cout << "equal ";
                isUpOrDown --;
                continue;
            }

            if(lastDiff > 3){
                cout << "mayor ";
                isUpOrDown = 0;
                continue;
            }
        }
        if(isUpOrDown > 0) {
            cout << "yes ";
            safeCount++;
        }
        cout << " " << isUpOrDown << endl;
    }

    // for (const auto& fila : matriz) {
    //     for (const auto& num : fila) {
    //         cout << num << " ";
    //     }
    //     cout << endl;
    // }

    cout << safeCount << endl;

    return 0;
}