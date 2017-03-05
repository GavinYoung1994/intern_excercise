import Data.List.Split
import Data.List

createPopulate :: String -> IO [String]
createPopulate file =  do
  fileStr <- readFile file
  return $ parseTable fileStr

parseTable :: String -> [String]
parseTable str = let rows = drop 1 (lines str) in
  let rows1 = map (\x -> splitOn "," x) rows in
  let rows2 = map (\x -> fst (splitAt 1 x) ++ tail (tail $ snd (splitAt 1 x))) rows1 in
  map (\x -> "INSERT INTO trans VALUES ("++ intercalate "," x ++ ")") rows2