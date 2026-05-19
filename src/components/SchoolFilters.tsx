import { getCategories, getCities, getLevels, getStatuses } from "@/lib/data";

export function SchoolFilters({
  selected
}: {
  selected: Record<string, string | undefined>;
}) {
  const cities = getCities();
  const categories = getCategories();
  const levels = getLevels();
  const statuses = getStatuses();

  return (
    <form className="filter-bar" action="/schools">
      <label>
        城市
        <select name="city" defaultValue={selected.city ?? ""}>
          <option value="">全部城市</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </label>
      <label>
        性质
        <select name="ownership" defaultValue={selected.ownership ?? ""}>
          <option value="">全部性质</option>
          <option value="公办">公办</option>
          <option value="民办">民办</option>
          <option value="待核验">待核验</option>
        </select>
      </label>
      <label>
        专业方向
        <select name="category" defaultValue={selected.category ?? ""}>
          <option value="">全部方向</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </label>
      <label>
        学制层次
        <select name="level" defaultValue={selected.level ?? ""}>
          <option value="">全部层次</option>
          {levels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </label>
      <label>
        来源状态
        <select name="status" defaultValue={selected.status ?? ""}>
          <option value="">全部状态</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </label>
      <button className="button" type="submit">筛选学校</button>
      <a className="button secondary" href="/schools">重置</a>
    </form>
  );
}
