# get data ready for epoch bulk convert
# from: 20240312045100 -- to: 2024-03-12T04:51:00+06:00

#using array seheri

def regular_time_to_epoc_bulk():
  for i in seheri:
      t = str(i)
      print(f"{t[:4]}-{t[4:6]}-{t[6:8]}T{t[8:10]}:{t[10:12]}:{t[12:14]}+06:00")




#get object ready

def create_datetime_obj():
  import datetime
  
  seheri_epoc_2024 = [
      1710197460, 1710283800, 1710370140, 1710456480, 1710542820, 1710629160,
      1710715500, 1710801840, 1710888180, 1710974520, 1711060860, 1711147200,
      1711233540, 1711319880, 1711406160, 1711492500, 1711578840, 1711665180,
      1711751460, 1711837800, 1711924140, 1712010480, 1712096820, 1712183160,
      1712269440, 1712355840, 1712438580, 1712528520, 1712614860, 1712701200
  ]
  
  iftar_epoc_2024 = [
      1710245400, 1710331800, 1710418260, 1710504660, 1710591120, 1710677520,
      1710763920, 1710850380, 1710936780, 1711023180, 1711109640, 1711196040,
      1711282440, 1711368900, 1711455300, 1711541760, 1711628160, 1711714620,
      1711801020, 1711887480, 1711973880, 1712060340, 1712146740, 1712233140,
      1712319600, 1712406000, 1712492460, 1712578860, 1712665260, 1712751720
  ]
  
  orig = datetime.datetime.fromtimestamp(1710180000)
  new = orig + datetime.timedelta(days=1)
  print(int(new.timestamp()))
  
  ts = 1710093600
  timestamp = datetime.datetime.fromtimestamp(int(ts))
  
  for i in range(0, 30):
      timestamp = timestamp + datetime.timedelta(days=1)
      print(
          f"{{ day: {i+1}, date: {int(timestamp.timestamp())}, seheri: {seheri_epoc_2024[i]}, iftar: {iftar_epoc_2024[i]} }},"
      )
