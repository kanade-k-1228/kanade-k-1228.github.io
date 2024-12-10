#include <stdio.h>
#include <string.h>
#define JOINTED_MAX 8//接続する線区の最大数(仙台６)+2
#define LINE 248//線区数＋1
#define ST 151//駅数+1
#define LINE_NAME 7//3文字
#define ST_NAME 7//3文字
#define ROUTE_MAX 250//予想される最大値

/*線区リスト書式
line_list.txt
始発駅	終着駅	営業キロ（0.1km単位)
線区数を#define LINE
*/

typedef struct {
	char c_t1[ST_NAME];
	char c_t2[ST_NAME];
	int i_t1;
	int i_t2;
	int length;//0.1km営業キロ
} line;

typedef struct {
	char name[ST_NAME];
	int line_jointed[JOINTED_MAX];
	int st_jointed[JOINTED_MAX];
} st;

//駅名を駅番号に変換
int st_c2i(st *st_list, char *st_name) {
	for (int i = 0; i < ST; i++) {
		if (strcmp(st_list[i].name, st_name) == 0) {
			return i;
		}
	}
	return 0;
}

//1つの駅番号と、間の線区番号から、駅番号を返す
int line2st(line *line_list, int st, int line) {
	if (line_list[line].i_t1 == st) { return line_list[line].i_t2; }
	if (line_list[line].i_t2 == st) { return line_list[line].i_t1; }
	return 0;
}

//二つの駅の間の線区を返す
int st2line(line *line_list, int st1, int st2) {
	for (int i = 0; i < LINE; i++) {
		if ((line_list[i].i_t1 == st1 && line_list[i].i_t2 == st2) || (line_list[i].i_t1 == st2 && line_list[i].i_t2 == st1)) {
			return i;
		}
	}
	return 0;
}

int main(void) {
	int i, j, k;
	//定数
	//txtから線区リストを生成
	line line_list[LINE] = { 0 };
	//line[0]は何も無い（jointedがおかしくなる）
	FILE *fp;
	if (fopen_s(&fp, "line_list.txt", "r") != 0) { printf("line_list.txt disable\n"); }
	for (int i = 1; i < LINE; i++) {
		fscanf_s(fp, "%s %s %d",
			line_list[i].c_t1, ST_NAME,
			line_list[i].c_t2, ST_NAME,
			&line_list[i].length);
	}
	fclose(fp);
	
	//線区リストから、駅リストを作る
	st st_list[ST] = { "",{ 0 } ,{ 0 } };//駅リスト[駅番号].name.line_jointed[index].st_jointed[index]
	int s = 1;//今のところの駅数（駅番号0はnull）
	bool t1_ok = false, t2_ok = false;//「t1,2が駅リストに存在する」フラグ
	for (int i = 1; i < LINE; i++) {
		t1_ok = false;
		t2_ok = false;
		//両端の駅が一致していたら、エラーを表示
		if (strcmp(line_list[i].c_t1, line_list[i].c_t2) == 0) {
			printf("SameTermimnal%d\n", i);
		}
		//t1,2を駅リストから探して、接続線区を追加
		for (j = 0; j < s; j++) {
			if (strcmp(st_list[j].name, line_list[i].c_t1) == 0) {
				st_list[j].line_jointed[6] = st_list[j].line_jointed[5];
				st_list[j].line_jointed[5] = st_list[j].line_jointed[4];
				st_list[j].line_jointed[4] = st_list[j].line_jointed[3];
				st_list[j].line_jointed[3] = st_list[j].line_jointed[2];
				st_list[j].line_jointed[2] = st_list[j].line_jointed[1];
				st_list[j].line_jointed[1] = i;
				t1_ok = true;
			}
			if (strcmp(st_list[j].name, line_list[i].c_t2) == 0) {
				st_list[j].line_jointed[6] = st_list[j].line_jointed[5];
				st_list[j].line_jointed[5] = st_list[j].line_jointed[4];
				st_list[j].line_jointed[4] = st_list[j].line_jointed[3];
				st_list[j].line_jointed[3] = st_list[j].line_jointed[2];
				st_list[j].line_jointed[2] = st_list[j].line_jointed[1];
				st_list[j].line_jointed[1] = i;
				t2_ok = true;
			}

		}

		//駅リストにt1,2がなかったら、追加
		if (!t1_ok) {
			s++;
			strcpy_s(st_list[s - 1].name, line_list[i].c_t1);
			st_list[s - 1].line_jointed[1] = i;
		}
		if (!t2_ok) {
			s++;
			strcpy_s(st_list[s - 1].name, line_list[i].c_t2);
			st_list[s - 1].line_jointed[1] = i;
		}
	}

	//線区リストの両端駅の番号表示を追加
	for (i = 0; i < LINE; i++) {
		line_list[i].i_t1 = st_c2i(st_list, line_list[i].c_t1);
		line_list[i].i_t2 = st_c2i(st_list, line_list[i].c_t2);
	}

	//接続駅追加
	for (i = 1; i < s; i++) {
		for (j = 0; j < JOINTED_MAX; j++) {
			st_list[i].st_jointed[j] = line2st(line_list, i, st_list[i].line_jointed[j]);
		}
	}

	printf("ーーー線区リストーーー\n番号\t端駅１\t\t端駅２\t\t営業㌔\n");
	for (i = 0; i < LINE; i++) {
		printf("%d\t%s\t%d\t%s\t%d\t%d\n",
			i,
			line_list[i].c_t1,
			line_list[i].i_t1,
			line_list[i].c_t2,
			line_list[i].i_t2,
			line_list[i].length);
	}

	printf("ーーー駅リストーーー\n番号\t名前\t接続線区\t\t\t接続駅\n");
	for (k = 0; k < s; k++) {
		printf("%d\t%s\t", k, st_list[k].name);
		for (j = 0; j < JOINTED_MAX; j++) {
			printf("%3d ", st_list[k].line_jointed[j]);
		}
		printf("\t");
		for (j = 0; j < JOINTED_MAX; j++) {
			printf("%3d ", st_list[k].st_jointed[j]);
		}
		printf("\n");
	}
	//変数
	int route[ROUTE_MAX] = { 0 };//通ってきた駅ルート
	int route_front = 0;//ルートの最前線のルート中の位置
	int length = 0;//今回の長さ
	int st_pointer[ST] = { 0 };//各駅での分岐
	int route_max[ROUTE_MAX] = { 0 };//最大記録
	int length_max = 0;//最大長
	int st_start, st_end;//始点,終点

	printf("\n始点：");
	scanf_s("%d", &st_start);
	printf("終点：");
	scanf_s("%d", &st_end);
	printf("始点：%d：%s\n終点：%d：%s\n", st_start, st_list[st_start].name, st_end, st_list[st_end].name);
	if (fopen_s(&fp, "log.txt", "w") != 0) { printf("log.txt disable\n"); }
	route[route_front] = st_start;//スタート地点に設定
	goto start;

	//探索
entry:
	if (route_front < 0) { goto done; }
start:
	if (route[route_front] == st_end) {
		//到達ルートを記録
		fprintf(fp, "\n");
		for (i = 0; i <= route_front; i++) {
			fprintf(fp, "%2d ", route[i]);
		}
		//長さを計算
		length = 0;
		for (i = 0; i <= route_front; i++) {
			length += line_list[st2line(line_list, route[i], route[i + 1])].length;
		}
		//長さを記録
		fprintf(fp, "\t\t%d", length);
		//長ければ記録更新
		if (length > length_max) {
			fprintf(fp, "★");
			length_max = length;
			for (i = 0; i <= route_front; i++) {
				route_max[i] = route[i];
			}
		}
		route_front--;
		goto entry;
	}
	else {
		//一度通っていないか？
		for (i = 0; i < route_front; i++) {
			if (route[route_front] == route[i]) {
				route_front--;
				goto entry;
			}
		}
		//最後まで探索したか？
		if (st_list[route[route_front]].st_jointed[st_pointer[route[route_front]] + 1] == 0) {
			st_pointer[route[route_front]] = 0;
			route_front--;
			goto entry;
		}
		else {
			st_pointer[route[route_front]]++;
			route[route_front + 1] = st_list[route[route_front]].st_jointed[st_pointer[route[route_front]]];
			route_front++;
			goto entry;
		}
	}

done:
	printf("探索終了\n");
	printf("%d\n", length_max);
	for (i = 0; i < ROUTE_MAX; i++) {
		printf("%s ", st_list[route_max[i]].name);
	}

	fclose(fp);
	return 0;
}
