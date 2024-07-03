function printCalendar(year, month) {
  // 指定された月の日数を取得
  const daysInMonth = new Date(year, month, 0).getDate();

  // 月の最初の日の曜日を取得（0:日曜日 ~ 6:土曜日）
  const firstDay = new Date(year, month - 1, 1).getDay();

  // 月の名前の配列
  const monthNames = [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  // カレンダーのヘッダーを表示（月と年）
  console.log(`     ${monthNames[month - 1]} ${year}`);

  // 曜日の略称を表示
  console.log('日 月 火 水 木 金 土');

  // カレンダーの日付部分を生成
  let day = 1;
  for (let i = 0; i < 6; i++) {  // 最大6週間分のループ
      let week = '';
      for (let j = 0; j < 7; j++) {  // 1週間（7日）分のループ
          if (i === 0 && j < firstDay) {
              // 月の最初の週で、月初めの日より前の部分は空白
              week += '   ';
          } else if (day > daysInMonth) {
              // 月の最終日を過ぎたらループを抜ける
              break;
          } else {
              // 日付を追加（2桁揃えで空白を加える）
              week += day.toString().padStart(2) + ' ';
              day++;
          }
      }
      // 各週の文字列をトリミングして表示
      console.log(week.trimEnd());
      // 月の最終日を過ぎたら全体のループを抜ける
      if (day > daysInMonth) break;
  }
}

function main() {
  // コマンドライン引数を取得
  const args = process.argv.slice(2);

  // 現在の年と月を取得(JavaScriptは0月から始まるから+1する)
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;

  // 引数のチェックと処理
  if (args.length > 0 && args[0] === '-m') {
      // -mオプションが指定されているかチェック
      if (args.length < 2) {
          // 月の引数が不足している場合のエラー処理
          console.error('Error: 表示したい月を数字で入力してください');
          process.exit(1);
      }
      // 月の引数を数値に変換
      month = parseInt(args[1]);
      // 月の値が有効かチェック
      if (isNaN(month) || month < 1 || month > 12) {
          // 無効な月の場合のエラー処理
          console.error('Error: 表示したい月を1~12で入力してください');
          process.exit(1);
      }
  }

  // カレンダーを表示
  printCalendar(year, month);
}

main();