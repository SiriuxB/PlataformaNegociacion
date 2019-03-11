using System;

namespace Dataifx.AuctionDesc.Infrastructure.Enumerations
{
    [Flags]
    public enum PerfilUsuario
    {
        Ordenante = 0x001,
        TraderSoporte = 0x002,
        Auxiliar = 0x004,
        DirectorMesa = 0x008,
        Auditor = 0x010,
        Administrador = 0x020,
        TraderConfirmacion = 0x040,
        AnalistaMercado = 0x080,
        MultiOrdenante = 0x100,
        Institucional = 0x200,
        Demo = 0x400
    }
}
