<center><h1>Educational Codeforces Round</h1></center> 

## edu 175

### A.

题意简化：

求 $\sum\limits_{i=1}^n[i\bmod 3=i\bmod 5]$。

解法：

$i\bmod 3=i\bmod 5=i\bmod 15<3$

所以每 $15$ 个有 $3$ 个。

手玩也可以找出规律。

### B.

题意简化：

给定序列 $a$，$a_i=±1$，初值 $x$，从 $a_1$ 开始依次累加，当 $x=0$ 时从头开始，共累计 $k$ 次，求 $x=0$ 的次数。

解法：

容易发现，当 $x=0$ 后是一个循环。

而在 $x=0$ 前，最多只会从 $a_1$ 累计到 $a_n$，所以模拟到第一次 $x=0$，然后计算循环节即可。

### C.

题意简化：

给定一个 01 串，最多可以翻转 $k$ 位，翻转后的权值是 $\max\limits_{i=1}^n[a_i\ne b_i]\times c_i$，求最小权值。 

解法：

最大值最小，容易二分。

- $c_i>mid$ 的 $a_i=b_i$
- $c_i<mid$ 的没有限制

计算需要操作的最小次数，检查和 $k$ 的大小即可。

时间复杂度：$O(n\log n)$。

### D.

题意简化：

给定一棵有根树，每次可以走到下一层的非儿子节点，求移动序列方案数。

解法：

容易发现移动转移是一个 DAG，dp 即可。

### E.

题意简化：

给定一个 01 环串，先手选择 `00`，后手选择 `01` 或 `10`，无法操作失败，判断多少子串满足先手必胜。

解法：

容易发现，胜负状态只和 01 串有关。

而对于一个确定的 01 串，容易得到一个 $O(n^22^n)$ 的博弈 dp 做法。

所以使用 dp 打表出 $n\le 20$ 的所有情况。尝试观察满足先手必胜的 01 满足什么性质。

由于 01 串只有 01，可以尝试寻找一下 01 数量和先手必胜的关系。

尝试了一下就发现了：

- $n\bmod 2=0$，$num[1]\le \lfloor\frac{m-1}{4}\rfloor$ 是先手必胜的充要条件（$num[1]\le \lfloor\frac{m-1}{4}\rfloor$ 的 01 串都是先手必胜）。
- $n\bmod 4=1$，$num[1]\le \frac{m+1}{4}$ 同上。
- $n\bmod 4=3$，$num[1]\le \frac{m-1}{4}-1$ 同上。

所以一个子串是否合法只和子串的长度和 1 的数量有关，分三类计算即可。

对于后两类是容易的，因为没有取整的限制，将分母乘到左侧，合并同类变量即可：

- $4\times(sum_r-sum_{l-1})\le r-l+2\rightarrow 4\times sum_r-r\le 4\times sum_{l-1}-(l-1)+1$
- $4\times(sum_r-sum_{l-1})\le r-l+1-1-4\rightarrow 4\times sum_r -r\le 4\times sum_{l-1}-(l-1)-5$

容易使用树状数组维护，但是需要在 $\bmod 4$ 的同余类中维护，开 $4$ 个树状数组即可。

第一类相对复杂，因为还要考虑取整问题。

一个解决办法是枚举 $l,r$ 的 $\bmod 4$ 剩余类，当满足 $(r-l+1)\bmod 2=0$ 时，直接额外计算取整对结果的贡献即可。

具体可得：$sum_r-sum_{l-1}\le \frac{r-l-(r-l)\bmod 4}{4}$，枚举 $l,r$ 的剩余类后，$(r-l)\bmod 4$ 就是常数了。

采用和前文同样的方式维护即可。

时间复杂度：$O(2\times 4\times n\log n)$。

关于结论一个感性的证明：

对于一轮操作，一定会使 01 串少 $3$ 个 $0$ 和 $1$ 个 $1$，所以如果 $0$ 的数量超过了 $3$ 倍的 $1$ 显然是先手必胜（需要结合 $n\bmod 2$ 和 $n\bmod 4$ 微调）。

反之一定先手必败，因为容易只要 01 串中有 $0$ 和 $1$，后手就一定能进行操作。

但是感觉如何“注意”到这个结论，仍是问题，还是建议打表（虽然仍然靠注意）。

### F.

科技题。

sos dp / fwt 

## edu 174

### A.

题意简化；

给定 $b_2,...,b_{n-1}$ $b_i=0$ 表示 $a_i=a_{i-1}\land a_i=a_{i+1}$，$b_i=1$ 表示 $a_i\ne a_{i-1}\lor a_i\ne a_{i+1}$，判断是否能构造出 $a$。

解法：

结论：除 $b_2,b_{n-1}$ 外不能有连续的长度为 $1$ 的 $0$ 段则一定有解，反之无解。

因为 $b_i=0,b_{i-1}=1$ 则 $a_i=a_{i-1}\land a_i\ne a_{i+1}$，所以 $b_{i+1}=0$。

对于下一段连续的 $1$，构造 $a_{j}=a_i$ 即可。

### B.

题意简化：

给定一个 $n\times m$ 的矩阵，对于两个位置，若不相邻则可以视作在同一个集合中。每次可以选择一个相同颜色的集合修改其中的颜色，求使得所有位置颜色相同的最少操作次数。

解法：

结论：每一种颜色最少一定可以划分成 $1$ 组或 $2$ 组。

只要把矩阵按 $01$ 交替染色，就能分成两部分，那么某一种颜色只会被划分到这两个集合中。

且如果会被划分到这两个集合中，则不可能存在只划分到一个集合中的构造。

所以答案即为所有颜色的集合数之和减去集合数最多的颜色的集合数。

这里还有一个小 trick 是某一种颜色只会被修改一次，改两次显然不优。

### C.

题意简化：

定义一个序列是好的，当且仅当其满足：

- $|a|\ge 3$

- $\forall i>1,\exists\ j<i,a_j<a_i$

- $\forall i<n,\exists\ j>i,a_j>a_i$

  给定一个只包含 $1,2,3$ 的序列，求存在多少好的子序列。

解法：

结论：合法序列是以一个 $1$ 开头，一个 $3$ 结尾，$2$ 在中间的序列。

因为根据定义，一定是 $a_1=\min\{a_1,..,a_n\},a_n=\max\{a_1,...,a_n\}$。

反之，若最小值出现在中间，那么左边一定不会有比它小的；最大值同理。

对于 $a_i=1,a_j=3$，令它们之间 $2$ 的数量为 $x$ 则其贡献为 $2^x-1$。

考虑 dp，$dp[x]$ 表示 $a_x=3$ 的所有合法子序列，那么 $dp[x]=dp[y]\times 2^z+{2^z-1}$ 其中 $y$ 是 $x$ 左侧第一个 $3$，$z$ 是 $x,y$ 之间的 $2$ 的数量。

除此之外，$a_x=3$ 还可以和在 $y,x$ 之间的 $1$ 匹配。同时注意到，这一部分的每一个 $1$ 只会和它后面的第一个 $3$ 匹配，所以这部分的贡献直接计算即可。

$dp[x]+\sum (2^{num[x]-num[j-1]}-1),a_j=1$


### D.

题意简化：

给定一个字符串，求最短区间，使得重排这个区间的字符后字符串可以成为一个回文串。

解法：

因为题目保证了 $n$ 为偶数，所以避免了 $n$ 为奇数的进一步分讨，简化了步骤。

因为奇偶同理，奇数的情况也就是偶数的情况再做一遍，所以去掉还是挺好的。

分类讨论：

- 区间不经过对称轴
- 区间经过对称轴

令：

- $len_1=l,1\le i<l,s_i=s_{n+1-i} \land s_{i+1}\ne s_{n-i}$
- $len_2=\frac{n}{2}-r,\forall r<i\le \frac{n}{2},s_i=s_{n+1-i} \land s_{i-1}\ne s_{n+2-i}$。

对于第一类，贪心地，区间是确定的，为 $[len_1+1,\frac{n}{2}-len_2]$。

只要判断 $s[l,r]$ 和 $s[n+1-r,n+1-l]$ 是否能重排后对称即可。

一个做法是直接将两个区间 `sort` 后判断相同即可。

更简单的是判断两个区间每种字符的出现次数是否相同。

对于第二类，贪心地，对于区间 $[l,r]$，要么 $l=len_1+1$，要么 $r=n-len_1$。而对应的 $r$ 和 $l$ 的范围枚举即可。

判断第二类的一个区间是否合法，对于 $[len_1+1,n-len_1]$ 中，$[l,r]$ 之外的部分，需要在 $[l,r]$ 选择字符去对应，所以就是将 $[l,r]$ 的字符数量减去 $[l,r]$ 之外的部分的字符数量，对于剩下的字符，判断一个字符集是否能重排成回文串是经典的，当且仅当字符集中出现次数为奇数的字符数量 $\le 1$ 时有解。

时间复杂度：$O(n)$。

### E.

答辩题

### F.

科技题。

DS，可撤销并查集。

## edu 173

### A.

题意简化：

求 $f(x)=\begin{cases}2f(\lfloor\frac{x}{4}\rfloor)&x>3\\1\end{cases}$

解法：

递归计算即可。

### B.

题意简化：

求 $\sum\limits_{i=1}^{9}[i\bmod 2=1\land \sum\limits_{j=1}^{n!}(d\times10^{j-1})\bmod i=0]$。

解法一：

分类讨论：

- $1$ 合法
- $3$ 只需要判断数位和是否是 $3$ 的倍数，即 $d\times (n!)\bmod 3$，当 $n\ge 3$ 时恒成立，反之计算出结果即可。
- $5$ 个位需要是 $5,0$，即 $d=5\lor d=0$
- $7$ 比较特殊，打表注意到 $7$ $6$ 位一循环，循环节为 `1 3 2 6 4 5`，因为 $1+3+2+6+4+5=21\bmod 7=0$，所以 $n\ge 6$ 时恒成立，反之计算出结果即可。
- $9$ 只需要判断数位和是否是 $9$ 的倍数，所以等价于求 $d\times (n!)\bmod 9$，当 $n\ge 6$ 是恒成立，反之计算出结果即可。

解法二：

实际上，本质上本题求的是 $x$ 关于 $10$ 的阶，一个求法是根据欧拉定理 $10^{\varphi(x)}\equiv 1\pmod x$，所以阶一定是 $\varphi(x)$ 的因子，所以存在 $O(\sqrt n)$ 求阶的做法。

在循环节内，可以将问题缩小到 $O(\varphi(x))$ 的规模，当数位位数足够大时，和数位无关。

此方式适用于数位长度是 $n!$ 外的式子，或更大范围的 $x$。

### C.

题意简化：

给定一个只含 `-1`,`1` 和最多一个不为 `-1`,`1` 的序列，去重后输出所有子数组和。

解法：

答辩题。

结论：对于只含 `-1`,`1` 的序列，其所有子序列可能的值为 $[最小子段和,最大子段和]$。

把序列按照唯一的不为 `-1`,`1` 的元素分成两部分。

先对两部分分别求最大子段和和最小子段和，将合法的数加入 `set`。

再求左边的后缀 $\min,\max$ 和右边的前缀 $\min,\max$。

那么经过这个不为 `-1`,`1` 的区间的值域就是 $[x+lmin+rmin,a+lmax+rmax]$。

如果没有不为 `-1`,`1` 的数，那么可以任选一个位置做上述过程。

注意边界问题，若左边或右边为空，仍要考虑不选元素为 $0$ 的情况。

### D.

题意简化：

给定 $l,r,G$，求 $|A-B|$ 最大的 $A,B$ 满足 $\gcd(A,B)=G,l\le A\le B\le r$。

解法：

先将 $A,B$ 除以 $G$，得到 $A',B',\gcd(A',B')=1,\lceil\frac{l}{G}\rceil\le A\le B\le \lfloor\frac{r}{G}\rfloor$。

那么此时问题就是在 $[L,R]$ 中找到两个距离最远的互质的数。

注意到，两个质数一定互质，所以合法的 $|A-B|$ 不超过 $[L,R]$ 中最远的两个质数距离。

容易得到，$[L,R]$ 中距离最远的两个质数是 $\ge L$ 的第一个质数和 $\le R$ 的第一个质数。

所以距离的枚举量为 $10^{18}$ 范围内两倍的质数距离。

根据经验，这大约是 $O(2\ln n)$ 的。

综上，时间复杂度为 $O(\ln n\log n)$。

### E.

题意简化：

给定两个 $n\times m$ 的矩阵 $a,b$，每次操作，可以选择某一行，将其所有元素与 $x$；也可以选择某一列，将其所有元素或 $x$，判断是否能把 $a$ 变成 $b$。

解法：

首先，二进制下各位独立，所以原问题等价于在 $O(\log a)$ 个 $01$ 矩阵上操作。

现在的问题是给定两个 $01$ 矩阵，每次操作要么将一行变成 $0$，要么将一列变成 $1$，判断能否把 $a$ 变成 $b$。

容易发现，若 $a_{i,j}=1,b_{i.j}=0$ 那么一定需要把一行变成 $0$，$a_{i,j}=0,b_{i,j}=1$ 那么一定需要把这一列变成 $1$。

但是，同时，若对于 $a_{i,j}=1,b_{i,j}=0$ 的同一行上，还有 $b_{i,j'}=1$，那么还需要把 $j'$ 这一列变成 $1$。

也就是说 $i$ 的行操作在 $j'$ 的列操作之前，反之亦然。

但是，还要注意，就算某一行不存在 $a_{i,j}=1,b_{i,j}=0$，只要这一行有 $b_{i,j'}=1$，那么就要求 $i$ 的行操作早于 $j'$ 的列操作。

因为这一行的行操作，还有可能是由于别的列操作引发的行操作触发的。

现在的问题就转换成了行/列 $x$ 的优先级高于列/行 $y$，判断是否存在一种合法顺序。

建出 $(行i,列j),(列j,行i)$ 之间的有向边，从 $a_{i,j}\ne b_{i,j}$ 的行/列出发，容易发现，如果无环就有解，反之就无解。

建图时需要区分行列编号，可以令列 $j$ 的编号为 $n+j$。

对于给定有向图上，从某点出发判断环可以通过三染色 `dfs` 实现，三染色 `dfs` 实际上就是把图上节点分成三类：dfs 在栈中的节点，不在栈中曾经到过节点，不在栈中的曾经没有到过的节点。当遍历到在栈中的节点时说明有环，标记曾经到过的点不再遍历避免 TLE。

时间复杂度：$O(nm\log a)$。

### F.

题意简化：

给定一个序列，$q$ 次询问在 $a_{l_i},...,a_{r_i}$ 中最多删除几个元素可以使得用剩下的元素玩 nim 游戏时先手必败，同时求方案数。

解法一：

前置知识：nim 游戏先手必败的条件是异或和为零。

所以原问题等价于询问在区间 $[l,r]$ 内选择最多的元素的异或和等于区间异或和。

因为 $0\le a_i\le 50$，而同一个元素的异或贡献只和它的出现次数的奇偶性有关，所以对于一个区间，只关心其 $[0,50]$ 每个元素的出现次数。

选择最多的元素的异或和等于区间异或和反过来就是选择最少的元素的异或和为零。因为同一个数异或只跟奇偶性有关，所以选择最少的元素每一个元素只会选 $1$ 次或者不选，此时一个区间 $r-l+1$ 的元素问题就转换成了最多 $51$ 个元素的问题。

对于这个子问题，需要分类讨论：

- 若 $num[0]>0$，那么最少只需要选 $1$ 个，且方案数就是 $num[0]$。
- 若 $num[x]\ge2$，那么最少只需要选 $2$ 个，且方案数是 $\sum\limits_{i=1}^{50}\binom{num[i]}{2}$。
- 反之，$dp[i][j]$ 表示使用 $[1,i]$ 得到异或和 $j$ 的最少数量及其方案数，答案即为 $dp[50][0]$，可以滚动数组优化，但是没有必要。

时间复杂度：$O(q\times a\times 2^{\lfloor\log_2^a\rfloor})=O(q\times 64\times 50)$。

解法二：
实际上在这题没什么实用意义，主要是提一个 trick。

主体内容不变，求出区间选择的最少元素满足异或和为零的区间长度部分和解法一一致。

区间是维护方案数，解法一在维护长度的同时直接维护了方案数。

但是也可以不同时维护，令 $dp[i][x][y]$ 表示使用 $[a_1,a_i]$ 选择 $x$ 个数异或和为 $y$ 的方案数。先求出长度后，区间 $[l,r]$ 选择 $x$ 个元素使得异或和为 $0$ 的方案数等于 $dp[r][x][0]-dp[l-1][x][0]$。

但是此时空间是 $O(n\times a\times 2^{\lfloor\log_2^a\rfloor})$ 的，不能接受。

可以将询问离线，对于 $[l_i,r_i]$ 的询问，把 $dp[r_i][x][0],dp[l_i-1][x][0]$ 分别挂到 $r_i,l_i$ 上，从 $1$ 开始跑 dp，空间滚掉第一维，维护 $i$ 上的询问贡献。

此时空间是 $O(a\times 2^{\lfloor\log_2^a\rfloor})$。

### G.

科技题。

分块数据结构。

## edu 172

### A.

题意简化：

给定序列 $a$，使得总和至少为 $k$ 时，从大到小取数能恰好取到 $k$ 的序列最小增量。

解法：

贪心地，从大到小累加到不超过 $k$ 的最大值所需的增量即是答案。

### B.

题意简化：

轮流取数，先手分数为元素数量$+$元素种数，先手期望最大，后手期望最小，求先手分数。

解法：

诈骗题/脑经急转弯

对于某一种元素，先手只取一个一定最优，所以对于任何出现不止一次的元素，先手都能获取。

所以两人的博弈仅在出现一次的元素上，一人取一半即可。

### C.

题意简化：

给定一个 01 串，要求划分成若干个子串，对于第 $i$ 个子串，`0` 的贡献是 $-i$，`1` 的贡献是 $i$，求最少划分成几组使得总和至少为 $k$。

解法：

划分不容易考虑，合并容易考虑，从合并入手。

对于已有的若干子串，若将其中相邻的两个合并，则子串数量减少 $1$，对结果的贡献是合并点之后 $0$ 的数量减去 $1$ 的数量。

所以贪心地，先将所有非负的贡献合并起来，然后对于负的贡献贪心合并小的，直到超过 $k$。

用堆维护或者升序后累计。

时间复杂度：$O(n\log n)$。

### D.

题意简化：

给定 $n$ 个区间，对于第 $i$ 个区间，求 $n$ 个区间中其超集区间交。

解法：

对于若干个有交的区间，其区间交即为集合的左端点的最大值和右端点的最小值。

所以问题为求 $l_j\le l_i,r_j\ge r_i$ 的 $\min\{r_j\}$，以及 $r_j\ge r_i,l_j\le l_i$ 的 $\max\{l_j\}$，两问题等价，仅考虑前者。

将区间按照左端点升序，即为求 $\ge r_i$ 的 $\min\{r_j\}$，在值域线段树上维护一个区间 $\min$ 即可，或者因为是一个开区间，所以在树状数组上维护一个后缀 $\min$。

时间复杂度：$O(n\log n)$。

注意特殊处理 $l$ 或者 $r$ 相等的区间。

### E.

### F.

题意简化：

定义子段和为 $\sum\limits_{i=l}^r a_i+b_l+b_r$，单点修改，维护区间上最大的两个不交子段和。

解法：

最大子段和经典问题变型。

根据两个不交子段分布情况，需要维护以下信息：

- $ans$ 表示区间最大的两个不交子段和
- $maxn$ 表示区间最大子段和
- $lmax,rmax$ 表示区间从左/右端点开始最大的子段和
- $pre,suf$ 表示区间从左/右端点开始的一段加上区间内不交的另一段的子段和的最大值
- $mid$ 表示区间从左端点和右端点向中间延申的两段子段和的最大值

转移即可。

注意 $pre,suf,ans,mid$ 在区间长度为 $1$ 时没有值。

时间复杂度：$O(n\log n)$。

## edu 171

### A.

题意简化：

在 $(0,0),(0,Y),(X,0),(X,Y)$ 的矩阵中构造两条互相垂直的长度至少为 $K$ 的线段。

解法：

诈骗题。

$\ge K$ 没有意义，直接构造最长的即可。

最长的互相垂直的两条边是正方形的对角线。

矩形中超过短边 $\times \sqrt 2$ 的斜线不存在相互垂直的线段，

所以把矩形缩成方形，然后输出对顶点坐标即可。

### B.

题意简化：

每次选择两个白色格子满足 $|i-j|\le k$ 染成黑色，要求最多一个 $\notin a$，求 $k$ 的最小值。

解法：

因为每个格子只能被染一次。$k$ 即为划分成的二元组的差值的最大值。

容易分讨：

- $n$ 为偶数，解唯一，升序后相邻两个作为一组即可。
- $n$ 为奇数，只有一个格子和外面的格子染色。直接枚举是哪一个，然后就是 $n$ 为偶数的子问题了。

一个小问题：枚举出来的那个格子，应该染能染的最近的一个，但是实际上没有意义，直接忽略即可。因为如果这个格子的染色距离超过了剩下了其它格子的差值的最大值，那么最优解一定会在枚举其它格子的时候被考虑到。

### C.

题意简化：

第 $i$ 个玩具第 $i$ 天开始售卖，$a_i=1$ 表示第 $i$ 天可以买玩具，若某一天买的玩具数量超过 $1$，则最贵的免费。求买 $1-n$ 玩具的最小花费。

解法：

性质 1：

- 只有最后一天会买超过 $2$ 个，其它时候要么不买，要么买 $2$ 个，一定不劣。

因为每次只会 free 一个，所以只要考虑哪些会被 free 即可。

贪心地从大到小判断 free。

性质 2：

- $a_i=0$ 的 $i$ 一定不会 free，因为对于它之后的玩具，每天只能 free 一个，free 比它贵的一定更优。

所以可以贪心地先用 $a_i=0$ 的玩具去 free $a_i=1$ 的比它贵的玩具。贪心地，应该使用最贵的，比 $a_i=1$ 的 $i$ 便宜的玩具去 free $i$。

若没有便宜的 $a_i=0$ 的玩具了，那么只能使用便宜 $a_i=1$ 的了，因为 $a_i=1$ 是可能被 free 的，所以优先使用便宜不劣。

倒序枚举判 free，用 `set` 维护这两者即可。

### D.

题意简化：

令 $s(l,r)=\sum\limits_{i=l}^r a_i,b=\{s(1,1),...,s(1,n),s(2,2),...,s(2,n),.s(n,n)\}$。

$q$ 次询问求 $\sum\limits_{i=l}^r b_i$。

解法：

推式子维护的数据结构题。

基本式子和树状数组维护区间加求区间和一致。

把 $b$ 分成 $n$ 个部分，令 $c_i=s(i,i),...,s(i,n)$，则 $c_i=\sum\limits_{j=i}^n a_j\times (n-j+1)$，初始化 $c_i=a_i\times (n-i+1)$，然后再求一遍后缀和即可。

那么每次询问时，考虑 $l,r$ 跨过了几个 $c_i$，设 $l$ 落在 $c_i$，$r$ 落在 $c_j$，那么中间部分答案即为 $\sum\limits_{x=i+1}^{j-1}c_x$，维护一个 $c$ 的前缀和差分即可。

而 $c_i,c_j$ 部分的答案则单独考虑。

- 若 $i=j$，则答案加上 $calcr(i,l)-calcr(j,r+1)$。
- 若 $i\ne j$，则答案加上 $calcr(i,l)+calcl(j,l)$。

其中 $calcr(i,l)$ 表示 $c_i$ 所表示 $b$ 的一段中，从 $l$ 到其段尾的和，$calcl(j,r)$ $c_j$ 所表示 $b$ 的一段中，从 $r$ 到其段首的和。

先要求出 $i,j$，这个在 $p_i=\sum\limits_{j=i}^n j$ 上 `lower_bound` 即可。

对  $calcr,calcl$ 分别推式子：

先对 $l,r$ 处理出其是第 $i,j$ 段的第几个元素。这个减去 $p$ 中最后一个小于 $l,r$ 的元素即可。

$calcr(i,z)=\sum\limits_{x=z}^n s(i,x)=\sum\limits_{x=z}^n a_x\times (n-x+1)+(n-z)\times\sum\limits_{x=i}^{z-1} a_x$。

前者是求完后缀和的 $c$，后者是 $a$ 的一个区间和再乘上一个常数。

$$
\begin{align}
    calcl(i,z)=\sum\limits_{x=1}^{z}s(i,x)=\sum\limits_{x=1}^z a_x\times [(n-x+1)+(z-n)]\\
    =\sum\limits_{x=1}^z a_x\times (n-x+1)-(n-z)\times \sum\limits_{x=1}^z a_x\\
\end{align}
$$


和 $calcr$ 类似处理即可。 

时间复杂度：$O(n\log n)$。

### E.

题意简化：

定义序列的权值为 $n-\text{popcount}(a_1\ \text{or}\ a_2\ \text{or}...\text{or}\ a_n)，求子序列权值的最大值。

解法：

原式 $=n+\text{zero}(a_1\ \text{or}\ a_2\ \text{or}...\text{or}\ a_n)-60$

考虑 $n+\text{zero}(a_1\ \text{or}\ a_2\ \text{or}...\text{or}\ a_n)$

对于每一个数和 $60$ 个数位，总共 $n+60$ 个元素，对于一个数 $a_i$ 和一个数位 $j$，若 $a_i$ 的第 $j$ 位为 $1$ 说明无法通过选这个数获得 $2$ 的收益。

若将答案视作在这 $n+60$ 个元素中选出若干个元素，那么上述 $a_i$ 和 $j$ 就不能同时选。

所以在 $a_i$ 和 $j$ 之间连边。

答案即为此图的最大独立集。

容易发现这是一个二分图，二分图最大独立集$=$点数$-$最大匹配。

使用匈牙利算法计算二分图最大匹配即可。

### F.

DS

## edu 170

### A.

题意简化：

要求写下两个字符串，每次可以写下一个字符，或者用一个字符串覆盖另一个字符串，求最少几次可以写完。

解法：

容易发现答案是 $|a|+|b|-\text{lcp}(a,b)$。

### B.

题意简化：

$f(x,y)=f(x,y-1)+f(x-1,y-1),f(x,0)=f(x,x)=1$，求 $f(x,y)$。

解法：

打表，注意到：$f(x,y)=2^y$。

### C.

题意简化：

给定一个序列，可以取出 $[x,x+k'-1],k'<k$ 的所有元素且需要值域上每一个值都要取到，求最多可以取出多少元素。

解法：

双指针维护即可。

### D.

题意简化：

有两个属性 $a,b$，给定一个操作序列 $r$：

- $r_i=0$，可以给 $a$ 或 $b$ 加 $1$
- $r_i>0$，若 $a\ge |r_i|$，贡献加 $1$
- $r_i<0$，若 $b\ge |r_i|$，贡献加 $1$

求通过合理安排 $a,b$ 最大化贡献和。

解法：

因为总共只有两个属性，所以只需要确定其中之一的增量。

容易 dp，$dp[i][x]$ 表示前 $i$ 个操作 $a=x$ 的最大贡献。

但是不能每一个 $r_i\ne 0$ 都转移一次 $[1,m']$，其中 $m'$ 是 $[1,i]$ 中 $r_i=0$ 的数量。注意到 $r_i=0$ 只有 $m$ 次，所以连续的 $r_i\ne 0$ 不会超过 $m+1$ 段，所以可以把每一段 $r_i\ne 0$ 合起来考虑，对于 $dp[i][x]$，贡献为 $\sum\begin{cases} |r_i|\le x & r_i>0\\|r_i|\le m'-x & r_i<0\end{cases}$，使用前缀和优化即可。

时间复杂度：$O(m^2)$。

### E.

题意简化；

有 $n$ 种牌，每种牌有 $m$ 张，对于两张牌 $(a,b),(c,d)$，当且仅当：

- $a=1,c\ne 1$
- $a=c,b>d$ 

时，认为 $(a,b)$ 击败了 $(c,d)$。

求将 $nm$ 张牌分成两堆使得其中一堆每一张牌都能在另一堆中找到能够击败它的牌的合法方案数。

解法：

首先注意到，除了 $a=1$，其它存在击败关系的牌一定是同一种牌，那么每种牌内部的方案独立，而对于这一种牌，如果不是一堆一半，那么多出来的牌就可以被 $a=1$ 击败。

考虑一种牌，令将其中的 $x$ 张牌分成合法的两堆的方案数是 $f(x)$，令 $g(x)=\sum f(i)x^i$。

那么答案即为 $[x^m]\prod\limits_{i=2}^ng_i(m-x)$，由于 $n,m\le 500$，所以暴力卷积即可，时间复杂度：$O(n^3)$。

考虑 $f(x)$ 如何求：

因为需要一个小的匹配一个大的，dp 即可：

令 $dp[i][j]$ 表示前 $i$ 小张牌中还有 $j$ 张没有被匹配，根据 $i$ 是否去和小的匹配转移即可。

时间复杂度：$O(n^2)$。

卷积使用分治 NTT 可以优化至 $O(n\log ^2n)$，时间复杂度瓶颈为 dp。

### F.

### G.

分块