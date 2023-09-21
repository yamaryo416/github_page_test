# ゴルフのスコア判定のプログラムの実装
# ゴルフのスコア
# 規定打数より多い場合
# ボギー:規定打数＋1打
# ダブルボギー:規定打数＋2打
# トリプルボギー:規定打数＋3打
# 規定打数以下の場合
# パー:規定打数ちょうど
# バーディ:規定打数−1打
# イーグル:規定打数−2打
# アルバトロス:規定打数−3打
# ただし規定打数4で1打の場合はホールインワンとする
# つまり規定打数5で2打の場合のみ該当
# コンドル:規定打数-4打
# 規定打数5で1打だった場合のみ該当(1打だが今回はホールインワンとはしない)
# ホールインワン:1打で入れた場合


# 規定打数とプレイヤー打数の数値を受け取る
x = gets.chomp.split(",").map(&:to_i) # 規定打数
y = gets.chomp.split(",").map(&:to_i) # プレーヤー打数


# 各ホールのスコアを計算する
# x,yの2つの引き数を繰り返し取り出して処理をする
# diffを出してその値をスコアに変換してscoresで表示する
scores = []

y.each_with_index do |player, index|
  diff = player - x[index]
  case diff
  when 1
    scores << "ボギー"
  when 0
    scores << "パー"
  when -1
    scores << "バーディー"
  when -2
    if player == 1 && x[index] == 3
      scores << "ホールインワン"
    else
      scores << "イーグル"
    end
  when -3
    if player == 1 && x[index] == 4
      scores << "ホールインワン"
    else
      scores << "アルバトロス"
    end
  when -4
      scores << "コンドル"
  else
    diff >= 2
    scores << "#{diff}ボギー"
  end
  
end

p scores.join(',')