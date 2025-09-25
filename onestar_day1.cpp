// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3

// 1   3 - 2
// 2   3 - 1
// 3   3 - 0
// 3   4 - 1
// 3   5 - 2
// 4   9 - 5


#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

vector<long int> vizq = {};
vector<long int> vder = {};

int main(){
    long int left = 0;
    long int right = 0;
    long int res = 0;
    while(cin >> left >> right){
        vizq.push_back(left);
        vder.push_back(right);
    }
    sort(vizq.begin(), vizq.end());
    sort(vder.begin(), vder.end());
    for(int i = 0; i < vizq.size(); i++){
        if(vizq[i] > vder[i]){
            res += vizq[i] - vder[i];
        } else {
            res += vder[i] - vizq[i];
        }
    }

    cout << res << endl;
    return 0;
}