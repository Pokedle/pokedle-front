import requests

print('INSERT INTO all_pokemons (name, img) VALUES ')
for i in range(1, 1000):
    r = requests.get(f'https://pokeapi.co/api/v2/pokemon/{i}')
    r = r.json()
    print(f"('{r['name'] if '-' not in r['name'] else r['name'].replace('-', ' ')}', '{r['sprites']['front_default']}')," if i != 999 else print(f"'({r['name'] if '-' not in r['name'] else r['name'].replace('-', ' ')}', '{r['sprites']['front_default']}');"))
