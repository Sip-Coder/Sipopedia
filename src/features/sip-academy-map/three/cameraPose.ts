import { Matrix4, Quaternion, Vector3 } from "three";
import {
  SIP_ACADEMY_CAMPUSES,
  SIP_ACADEMY_GUILDS,
  type GlobeCoordinate,
  type SipAcademyCampus,
  type SipAcademyMapSelection
} from "../sipAcademyGuilds";
import { globeCoordinateToVector3 } from "./createRegionOverlays";

const CAMPUS_INSPECTION_PITCH = -0.48;
const WORLD_RIGHT = new Vector3(1, 0, 0);

function selectionCoordinate(selection: SipAcademyMapSelection): GlobeCoordinate {
  if (selection.kind === "world") return { lat: 8, lon: 0 };
  if (selection.kind === "guild") {
    const guild = SIP_ACADEMY_GUILDS.find((candidate) => candidate.id === selection.id);
    const campuses = guild?.campusIds
      .map((campusId) => SIP_ACADEMY_CAMPUSES.find((campus) => campus.id === campusId))
      .filter((campus): campus is SipAcademyCampus => Boolean(campus)) ?? [];
    if (campuses.length > 0) {
      return {
        lat: campuses.reduce((sum, campus) => sum + campus.coordinate.lat, 0) / campuses.length,
        lon: campuses.reduce((sum, campus) => sum + campus.coordinate.lon, 0) / campuses.length
      };
    }
    return guild?.anchor ?? { lat: 0, lon: 0 };
  }
  return SIP_ACADEMY_CAMPUSES.find((campus) => campus.id === selection.id)?.coordinate ?? { lat: 0, lon: 0 };
}

function coordinateToViewQuaternion(coordinate: GlobeCoordinate): Quaternion {
  const normal = globeCoordinateToVector3(coordinate, 1).normalize();
  const longitude = (coordinate.lon * Math.PI) / 180;
  const east = new Vector3(Math.cos(longitude), 0, -Math.sin(longitude)).normalize();
  const north = normal.clone().cross(east).normalize();
  const localBasis = new Matrix4().makeBasis(east, north, normal);
  return new Quaternion().setFromRotationMatrix(localBasis.invert());
}

/** Centers a selected territory and lifts academy campuses into the upper viewing zone. */
export function selectionToViewQuaternion(selection: SipAcademyMapSelection): Quaternion {
  const view = coordinateToViewQuaternion(selectionCoordinate(selection));
  if (selection.kind === "campus") {
    view.premultiply(new Quaternion().setFromAxisAngle(WORLD_RIGHT, CAMPUS_INSPECTION_PITCH));
  }
  return view;
}

/** Keeps authored campus clearance while granting compact screens extra breathing room. */
export function campusFocusDistance(campus: SipAcademyCampus, isCompact = false): number {
  const responsiveOffset = isCompact ? 0.34 : 0.22;
  return Math.max(4.22, Math.min(4.72, campus.cameraDistance + responsiveOffset));
}
