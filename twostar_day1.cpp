// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3

// cardinalidad
// 3   3 - 9
// 4   1 - 4
// 2   0 - 0
// 1   0 - 0
// 3   3 - 9
// 3   3 - 9


#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

vector<long int> vizq = {};
vector<long int> vder = {};


// sort( <inicio_de_la_serie>, <final_de_la_serie>)

int main(){
    long int left = 0;
    long int right = 0;
    long int res = 0;
    while(cin >> left >> right){
        vizq.push_back(left);
        vder.push_back(right);
    }
    for(int i = 0; i < vizq.size(); i++){
        long int temp = 0;
        for(int j = 0; j < vder.size(); j++){
            if(vizq[i] == vder[j]){
                temp++;
            }
        }
        res += (temp * vizq[i]);
    }

    cout << res << endl;
    return 0;
}